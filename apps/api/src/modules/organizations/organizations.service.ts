import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const org = await this.prisma.organization.findUnique({
      where: { userId },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        missions: { orderBy: { startDate: "desc" } },
      },
    });
    if (!org) throw new NotFoundException("Organization not found");
    return org;
  }

  async createMission(
    userId: string,
    data: {
      title: string;
      description?: string;
      latitude: number;
      longitude: number;
      address: string;
      startDate: string;
      endDate: string;
      volunteersNeeded: number;
    },
  ) {
    const org = await this.prisma.organization.findUnique({ where: { userId } });
    if (!org) throw new NotFoundException("Organization not found");

    return this.prisma.medicalMission.create({
      data: {
        orgId: org.id,
        title: data.title,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        volunteersNeeded: data.volunteersNeeded,
      },
    });
  }

  async listMissions(userId: string) {
    const org = await this.prisma.organization.findUnique({ where: { userId } });
    if (!org) return { missions: [], total: 0 };

    const missions = await this.prisma.medicalMission.findMany({
      where: { orgId: org.id },
      orderBy: { startDate: "desc" },
    });
    return { missions, total: missions.length };
  }

  async listAllMissions() {
    const missions = await this.prisma.medicalMission.findMany({
      where: { endDate: { gte: new Date() } },
      include: {
        organization: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
      },
      orderBy: { startDate: "asc" },
    });
    return { missions, total: missions.length };
  }
}
