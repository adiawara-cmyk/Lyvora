import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { SearchDoctorsDto } from "./dto/search-doctors.dto";

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
