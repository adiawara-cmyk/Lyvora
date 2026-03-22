import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getPublicStats() {
    const [totalDoctors, totalPatients, totalOrgs, totalAppointments, countriesRaw] =
      await Promise.all([
        this.prisma.doctorProfile.count({
          where: { verificationStatus: "VERIFIED" },
        }),
        this.prisma.patient.count(),
        this.prisma.organization.count(),
        this.prisma.appointment.count({
          where: { status: "COMPLETED" },
        }),
        this.prisma.doctorProfile.findMany({
          where: { verificationStatus: "VERIFIED" },
          select: { licenseCountry: true },
          distinct: ["licenseCountry"],
        }),
      ]);

    const countries = countriesRaw.filter((c) => c.licenseCountry).length;

    return {
      totalDoctors,
      totalPatients,
      totalOrgs,
      totalAppointments,
      countries: countries || 0,
      avgResponseMinutes: 12,
    };
  }
}
