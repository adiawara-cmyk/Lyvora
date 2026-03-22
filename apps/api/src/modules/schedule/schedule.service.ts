import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

interface WorkingHoursInput {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration?: number;
  isActive?: boolean;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async setWorkingHours(userId: string, hours: WorkingHoursInput[]) {
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException("Doctor profile not found");

    const results = [];
    for (const h of hours) {
      const result = await this.prisma.doctorWorkingHours.upsert({
        where: {
          doctorId_dayOfWeek: {
            doctorId: profile.id,
            dayOfWeek: h.dayOfWeek,
          },
        },
        create: {
          doctorId: profile.id,
          dayOfWeek: h.dayOfWeek,
          startTime: h.startTime,
          endTime: h.endTime,
          slotDuration: h.slotDuration ?? 30,
          isActive: h.isActive ?? true,
        },
        update: {
          startTime: h.startTime,
          endTime: h.endTime,
          slotDuration: h.slotDuration ?? 30,
          isActive: h.isActive ?? true,
        },
      });
      results.push(result);
    }

    return results;
  }

  async getWorkingHours(userId: string) {
    const profile = await this.prisma.doctorProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException("Doctor profile not found");

    return this.prisma.doctorWorkingHours.findMany({
      where: { doctorId: profile.id },
      orderBy: { dayOfWeek: "asc" },
    });
  }

  async getAvailableSlots(doctorId: string, date: string): Promise<TimeSlot[]> {
    const targetDate = new Date(date);
    const dayOfWeek = targetDate.getDay(); // 0=Sunday

    // Get working hours for that day
    const workingHours = await this.prisma.doctorWorkingHours.findUnique({
      where: {
        doctorId_dayOfWeek: {
          doctorId,
          dayOfWeek,
        },
      },
    });

    if (!workingHours || !workingHours.isActive) {
      return [];
    }

    // Generate time slots
    const slots: TimeSlot[] = [];
    const [startH, startM] = workingHours.startTime.split(":").map(Number);
    const [endH, endM] = workingHours.endTime.split(":").map(Number);
    const slotDuration = workingHours.slotDuration;

    let currentMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    // Get existing appointments for this doctor on this date
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const appointments = await this.prisma.appointment.findMany({
      where: {
        doctorId,
        scheduledAt: { gte: dayStart, lte: dayEnd },
        status: { notIn: ["CANCELLED"] },
      },
    });

    while (currentMinutes + slotDuration <= endMinutes) {
      const slotStartH = Math.floor(currentMinutes / 60);
      const slotStartM = currentMinutes % 60;
      const slotEndMinutes = currentMinutes + slotDuration;
      const slotEndH = Math.floor(slotEndMinutes / 60);
      const slotEndM = slotEndMinutes % 60;

      const startTime = `${String(slotStartH).padStart(2, "0")}:${String(slotStartM).padStart(2, "0")}`;
      const endTime = `${String(slotEndH).padStart(2, "0")}:${String(slotEndM).padStart(2, "0")}`;

      // Check if slot overlaps with existing appointments
      const slotStart = new Date(date);
      slotStart.setHours(slotStartH, slotStartM, 0, 0);
      const slotEnd = new Date(date);
      slotEnd.setHours(slotEndH, slotEndM, 0, 0);

      const isOccupied = appointments.some((appt) => {
        const apptStart = new Date(appt.scheduledAt);
        const apptEnd = new Date(apptStart.getTime() + appt.duration * 60000);
        return slotStart < apptEnd && slotEnd > apptStart;
      });

      slots.push({ startTime, endTime, available: !isOccupied });

      currentMinutes += slotDuration;
    }

    return slots;
  }
}
