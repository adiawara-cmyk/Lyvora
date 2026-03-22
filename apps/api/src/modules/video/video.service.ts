import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { v4 as uuid } from "uuid";

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) {}

  async createRoom(appointmentId: string, userId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true, patient: true },
    });
    if (!appointment) throw new NotFoundException("Appointment not found");

    // Verify user is part of appointment
    if (
      appointment.doctor.userId !== userId &&
      appointment.patient.userId !== userId
    ) {
      throw new ForbiddenException("You are not part of this appointment");
    }

    // Check if session already exists
    const existing = await this.prisma.videoSession.findUnique({
      where: { appointmentId },
    });
    if (existing) return existing;

    const roomId = uuid();
    const roomUrl = `https://meet.jit.si/lyvora-${roomId}`;

    return this.prisma.videoSession.create({
      data: {
        appointmentId,
        roomId,
        roomUrl,
      },
    });
  }

  async getRoom(appointmentId: string, userId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true, patient: true },
    });
    if (!appointment) throw new NotFoundException("Appointment not found");

    if (
      appointment.doctor.userId !== userId &&
      appointment.patient.userId !== userId
    ) {
      throw new ForbiddenException("You are not part of this appointment");
    }

    const session = await this.prisma.videoSession.findUnique({
      where: { appointmentId },
    });
    if (!session) throw new NotFoundException("Video session not found");

    return session;
  }

  async endSession(appointmentId: string, userId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true, patient: true },
    });
    if (!appointment) throw new NotFoundException("Appointment not found");

    if (
      appointment.doctor.userId !== userId &&
      appointment.patient.userId !== userId
    ) {
      throw new ForbiddenException("You are not part of this appointment");
    }

    return this.prisma.videoSession.update({
      where: { appointmentId },
      data: { endedAt: new Date() },
    });
  }
}
