import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { SearchDoctorsDto } from "./dto/search-doctors.dto";
import { AppointmentType } from "@prisma/client";

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async search(dto: SearchDoctorsDto) {
    const where: any = {
      verificationStatus: "VERIFIED",
    };

    if (dto.specialty) {
      where.specialties = { has: dto.specialty };
    }

    if (dto.language) {
      where.languages = { has: dto.language };
    }

    if (dto.availableNow !== false) {
      where.availability = { isAvailable: true };
    }

    const doctors = await this.prisma.doctorProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        availability: true,
      },
      take: 50,
    });

    let results = doctors.map((doc) => ({
      id: doc.id,
      userId: doc.userId,
      name: `Dr. ${doc.user.firstName} ${doc.user.lastName}`,
      avatar: doc.user.avatar,
      specialties: doc.specialties,
      languages: doc.languages,
      verificationStatus: doc.verificationStatus,
      bio: doc.bio,
      yearsExperience: doc.yearsExperience,
      isAvailable: doc.availability?.isAvailable ?? false,
      latitude: doc.availability?.latitude,
      longitude: doc.availability?.longitude,
      address: doc.availability?.address,
      consultationType: doc.availability?.consultationType,
    }));

    // Filter by distance if lat/lng provided
    if (dto.lat !== undefined && dto.lng !== undefined) {
      const radiusKm = dto.radiusKm ?? 50;
      results = results.filter((doc) => {
        if (!doc.latitude || !doc.longitude) return false;
        const dist = this.haversineDistance(
          dto.lat!,
          dto.lng!,
          doc.latitude,
          doc.longitude,
        );
        return dist <= radiusKm;
      });
    }

    return { doctors: results, total: results.length };
  }

  async findById(id: string) {
    const doc = await this.prisma.doctorProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true,
          },
        },
        availability: true,
        plannedPresence: {
          where: { endDate: { gte: new Date() } },
          orderBy: { startDate: "asc" },
        },
      },
    });
    if (!doc) throw new NotFoundException("Doctor not found");
    return doc;
  }

  async updateProfile(
    userId: string,
    data: {
      specialties?: string[];
      languages?: string[];
      bio?: string;
      licenseNumber?: string;
      licenseCountry?: string;
    },
  ) {
    return this.prisma.doctorProfile.update({
      where: { userId },
      data,
    });
  }

  async toggleAvailability(
    userId: string,
    data: {
      isAvailable: boolean;
      latitude?: number;
      longitude?: number;
      address?: string;
      consultationType?: "IN_PERSON" | "TELECONSULT" | "BOTH";
    },
  ) {
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException("Doctor profile not found");

    return this.prisma.doctorAvailability.upsert({
      where: { doctorId: profile.id },
      create: {
        doctorId: profile.id,
        ...data,
      },
      update: data,
    });
  }

  async getAvailability(userId: string) {
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId },
      include: { availability: true },
    });
    if (!profile) throw new NotFoundException("Doctor profile not found");
    return profile.availability;
  }

  // === Fees ===

  async setFees(
    userId: string,
    fees: { consultationType: AppointmentType; label?: string; amount: number; currency?: string }[],
  ) {
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException("Doctor profile not found");

    const results = [];
    for (const fee of fees) {
      const result = await this.prisma.doctorFee.upsert({
        where: {
          doctorId_consultationType: {
            doctorId: profile.id,
            consultationType: fee.consultationType,
          },
        },
        create: {
          doctorId: profile.id,
          consultationType: fee.consultationType,
          label: fee.label ?? "Consultation",
          amount: fee.amount,
          currency: fee.currency ?? "EUR",
        },
        update: {
          label: fee.label ?? "Consultation",
          amount: fee.amount,
          currency: fee.currency ?? "EUR",
        },
      });
      results.push(result);
    }

    return results;
  }

  async getFees(doctorId: string) {
    return this.prisma.doctorFee.findMany({
      where: { doctorId },
    });
  }

  // === Reviews ===

  async createReview(
    patientUserId: string,
    doctorId: string,
    rating: number,
    comment?: string,
  ) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId: patientUserId },
    });
    if (!patient) throw new NotFoundException("Patient profile not found");

    // Verify patient has a completed appointment with this doctor
    const completedAppointment = await this.prisma.appointment.findFirst({
      where: {
        patientId: patient.id,
        doctorId,
        status: "COMPLETED",
      },
    });
    if (!completedAppointment) {
      throw new BadRequestException(
        "You can only review a doctor after a completed appointment",
      );
    }

    // Check if already reviewed
    const existing = await this.prisma.doctorReview.findUnique({
      where: {
        doctorId_patientId: {
          doctorId,
          patientId: patient.id,
        },
      },
    });
    if (existing) {
      throw new BadRequestException("You have already reviewed this doctor");
    }

    return this.prisma.doctorReview.create({
      data: {
        doctorId,
        patientId: patient.id,
        rating,
        comment: comment || null,
      },
    });
  }

  async getReviews(doctorId: string) {
    const reviews = await this.prisma.doctorReview.findMany({
      where: { doctorId },
      include: {
        patient: {
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      reviews: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        patientName: `${r.patient.user.firstName} ${r.patient.user.lastName}`,
        patientAvatar: r.patient.user.avatar,
        createdAt: r.createdAt,
      })),
      total: reviews.length,
    };
  }

  // === Full Profile ===

  async getFullProfile(doctorId: string) {
    const doc = await this.prisma.doctorProfile.findUnique({
      where: { id: doctorId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            email: true,
          },
        },
        availability: true,
        fees: true,
        reviews: {
          include: {
            patient: {
              include: {
                user: {
                  select: { firstName: true, lastName: true, avatar: true },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        workingHours: {
          where: { isActive: true },
          orderBy: { dayOfWeek: "asc" },
        },
        plannedPresence: {
          where: { endDate: { gte: new Date() } },
          orderBy: { startDate: "asc" },
        },
      },
    });

    if (!doc) throw new NotFoundException("Doctor not found");

    // Calculate average rating
    const avgRating =
      doc.reviews.length > 0
        ? doc.reviews.reduce((sum, r) => sum + r.rating, 0) / doc.reviews.length
        : null;

    return {
      ...doc,
      averageRating: avgRating ? Math.round(avgRating * 10) / 10 : null,
      reviewCount: doc.reviews.length,
      reviews: doc.reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        patientName: `${r.patient.user.firstName} ${r.patient.user.lastName}`,
        patientAvatar: r.patient.user.avatar,
        createdAt: r.createdAt,
      })),
    };
  }

  private haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
