import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(
    patientUserId: string,
    data: {
      doctorId: string;
      scheduledAt: string;
      type: "IN_PERSON" | "TELECONSULT";
      notes?: string;
    },
  ) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId: patientUserId },
    });
    if (!patient) throw new NotFoundException("Patient profile not found");

    const doctor = await this.prisma.doctorProfile.findUnique({
      where: { id: data.doctorId },
    });
    if (!doctor) throw new NotFoundException("Doctor not found");

    return this.prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: data.doctorId,
        scheduledAt: new Date(data.scheduledAt),
        type: data.type,
        notes: data.notes,
      },
      include: {
        doctor: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
      },
    });
  }

  async listForPatient(patientUserId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId: patientUserId },
    });
    if (!patient) return { appointments: [], total: 0 };

    const appointments = await this.prisma.appointment.findMany({
      where: { patientId: patient.id },
      include: {
        doctor: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
      },
      orderBy: { scheduledAt: "desc" },
    });
    return { appointments, total: appointments.length };
  }

  async listForDoctor(doctorUserId: string) {
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId: doctorUserId },
    });
    if (!profile) return { appointments: [], total: 0 };

    const appointments = await this.prisma.appointment.findMany({
      where: { doctorId: profile.id },
      include: {
        patient: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
      },
      orderBy: { scheduledAt: "desc" },
    });
    return { appointments, total: appointments.length };
  }

  async updateStatus(
    appointmentId: string,
    userId: string,
    status: "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
  ) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true, patient: true },
    });
    if (!appointment) throw new NotFoundException("Appointment not found");

    if (
      appointment.doctor.userId !== userId &&
      appointment.patient.userId !== userId
    ) {
      throw new BadRequestException("Not authorized to update this appointment");
    }

    return this.prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });
  }
}
