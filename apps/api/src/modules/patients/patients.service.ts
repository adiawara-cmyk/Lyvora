import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true, phone: true },
        },
      },
    });
    if (!patient) throw new NotFoundException("Patient profile not found");
    return patient;
  }

  async updateProfile(
    userId: string,
    data: { dateOfBirth?: Date; gender?: string; emergencyContact?: string; insuranceInfo?: string },
  ) {
    return this.prisma.patient.update({ where: { userId }, data });
  }
}
