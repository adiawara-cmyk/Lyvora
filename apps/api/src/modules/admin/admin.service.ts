import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getPendingValidations() {
    const [doctors, organizations] = await Promise.all([
      this.prisma.doctorProfile.findMany({
        where: { verificationStatus: "PENDING" },
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, email: true, createdAt: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.organization.findMany({
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, email: true, createdAt: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      doctors,
      organizations,
      totalPending: doctors.length,
    };
  }

  async verifyDoctor(doctorProfileId: string, status: "VERIFIED" | "REJECTED") {
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { id: doctorProfileId },
    });
    if (!profile) throw new NotFoundException("Doctor profile not found");

    return this.prisma.doctorProfile.update({
      where: { id: doctorProfileId },
      data: { verificationStatus: status },
    });
  }

  async getRecentActivity() {
    const recentDoctors = await this.prisma.doctorProfile.findMany({
      take: 10,
      include: {
        user: {
          select: { firstName: true, lastName: true, createdAt: true },
        },
        availability: { select: { isAvailable: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return recentDoctors.map((doc) => ({
      id: doc.id,
      name: `Dr. ${doc.user.firstName} ${doc.user.lastName}`,
      specialties: doc.specialties,
      verificationStatus: doc.verificationStatus,
      isOnline: doc.availability?.isAvailable ?? false,
      createdAt: doc.user.createdAt,
    }));
  }

  async getDashboardStats() {
    const [totalUsers, totalDoctors, totalPatients, totalOrgs, pendingValidations] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.doctorProfile.count(),
        this.prisma.patient.count(),
        this.prisma.organization.count(),
        this.prisma.doctorProfile.count({
          where: { verificationStatus: "PENDING" },
        }),
      ]);

    return {
      totalUsers,
      totalDoctors,
      totalPatients,
      totalOrgs,
      pendingValidations,
    };
  }
}
