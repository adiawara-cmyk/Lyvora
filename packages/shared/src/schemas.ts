import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: z.enum(["PATIENT", "DOCTOR"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const searchDoctorsSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  radiusKm: z.number().min(1).max(100).default(50),
  specialty: z.string().optional(),
  language: z.string().optional(),
  availableNow: z.boolean().default(true),
});

export const bookAppointmentSchema = z.object({
  doctorId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
  type: z.enum(["IN_PERSON", "TELECONSULT"]),
  notes: z.string().max(1000).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SearchDoctorsInput = z.infer<typeof searchDoctorsSchema>;
export type BookAppointmentInput = z.infer<typeof bookAppointmentSchema>;
