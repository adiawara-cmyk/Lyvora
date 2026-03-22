import {
  Controller, Get, Post, Patch, Body, Param, UseGuards, Request,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AppointmentsService } from "./appointments.service";

@ApiTags("appointments")
@Controller("appointments")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: "Book an appointment" })
  create(
    @Request() req: any,
    @Body()
    body: {
      doctorId: string;
      scheduledAt: string;
      type: "IN_PERSON" | "TELECONSULT";
      notes?: string;
    },
  ) {
    return this.appointmentsService.create(req.user.id, body);
  }

  @Get()
  @ApiOperation({ summary: "List my appointments" })
  list(@Request() req: any) {
    if (req.user.role === "DOCTOR") {
      return this.appointmentsService.listForDoctor(req.user.id);
    }
    return this.appointmentsService.listForPatient(req.user.id);
  }

  @Patch(":id/status")
  @ApiOperation({ summary: "Update appointment status" })
  updateStatus(
    @Request() req: any,
    @Param("id") id: string,
    @Body("status") status: "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
  ) {
    return this.appointmentsService.updateStatus(id, req.user.id, status);
  }
}
