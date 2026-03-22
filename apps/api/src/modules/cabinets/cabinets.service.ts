import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class CabinetsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    data: {
      name: string;
      address: string;
      latitude: number;
      longitude: number;
      phone?: string;
      description?: string;
    },
  ) {
    const existing = await this.prisma.cabinet.findUnique({
      where: { managedById: userId },
    });
    if (existing) {
      throw new BadRequestException("You already have a cabinet");
    }

    return this.prisma.cabinet.create({
      data: {
        ...data,
        managedById: userId,
      },
    });
  }

  async getMyProfile(userId: string) {
    const cabinet = await this.prisma.cabinet.findUnique({
      where: { managedById: userId },
      include: {
        replacementRequests: {
          include: {
            applications: {
              include: {
                doctor: {
                  include: {
                    user: {
                      select: { firstName: true, lastName: true, avatar: true },
                    },
                  },
                },
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (!cabinet) throw new NotFoundException("Cabinet not found");
    return cabinet;
  }

  async createReplacementRequest(
    userId: string,
    data: {
      specialty: string;
      startDate: string;
      endDate: string;
      description?: string;
    },
  ) {
    const cabinet = await this.prisma.cabinet.findUnique({
      where: { managedById: userId },
    });
    if (!cabinet) throw new NotFoundException("Cabinet not found");

    return this.prisma.replacementRequest.create({
      data: {
        cabinetId: cabinet.id,
        specialty: data.specialty,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        description: data.description || null,
      },
    });
  }

  async listMyRequests(userId: string) {
    const cabinet = await this.prisma.cabinet.findUnique({
      where: { managedById: userId },
    });
    if (!cabinet) return { requests: [], total: 0 };

    const requests = await this.prisma.replacementRequest.findMany({
      where: { cabinetId: cabinet.id },
      include: {
        applications: {
          include: {
            doctor: {
              include: {
                user: {
                  select: { firstName: true, lastName: true, avatar: true },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return { requests, total: requests.length };
  }

  async listOpenRequests() {
    const requests = await this.prisma.replacementRequest.findMany({
      where: { status: "OPEN" },
      include: {
        cabinet: {
          select: { name: true, address: true, phone: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return { requests, total: requests.length };
  }

  async applyToRequest(
    requestId: string,
    doctorUserId: string,
    message?: string,
  ) {
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId: doctorUserId },
    });
    if (!profile) throw new NotFoundException("Doctor profile not found");

    const request = await this.prisma.replacementRequest.findUnique({
      where: { id: requestId },
    });
    if (!request) throw new NotFoundException("Replacement request not found");
    if (request.status !== "OPEN") {
      throw new BadRequestException("This request is no longer open");
    }

    // Check if already applied
    const existing = await this.prisma.replacementApplication.findUnique({
      where: {
        requestId_doctorId: {
          requestId,
          doctorId: profile.id,
        },
      },
    });
    if (existing) {
      throw new BadRequestException("You have already applied to this request");
    }

    return this.prisma.replacementApplication.create({
      data: {
        requestId,
        doctorId: profile.id,
        message: message || null,
      },
    });
  }

  async handleApplication(
    applicationId: string,
    userId: string,
    status: "ACCEPTED" | "REJECTED",
  ) {
    const application = await this.prisma.replacementApplication.findUnique({
      where: { id: applicationId },
      include: {
        request: {
          include: { cabinet: true },
        },
      },
    });
    if (!application) throw new NotFoundException("Application not found");

    // Verify the user owns the cabinet
    if (application.request.cabinet.managedById !== userId) {
      throw new ForbiddenException(
        "You can only manage applications for your own cabinet",
      );
    }

    const updated = await this.prisma.replacementApplication.update({
      where: { id: applicationId },
      data: { status },
    });

    // If accepted, mark the request as filled
    if (status === "ACCEPTED") {
      await this.prisma.replacementRequest.update({
        where: { id: application.requestId },
        data: { status: "FILLED" },
      });
    }

    return updated;
  }
}
