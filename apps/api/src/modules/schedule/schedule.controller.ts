import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { ScheduleService } from "./schedule.service";

@ApiTags("schedule")
@Controller("schedule")
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Post("working-hours")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("DOCTOR" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Set working hours" })
  setWorkingHours(
    @Request() req: any,
    @Body()
    body: {
      hours: {
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        slotDuration?: number;
        isActive?: boolean;
      }[];
    },
  ) {
    return this.scheduleService.setWorkingHours(req.user.id, body.hours);
  }

  @Get("working-hours")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("DOCTOR" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get my working hours" })
  getWorkingHours(@Request() req: any) {
    return this.scheduleService.getWorkingHours(req.user.id);
  }

  @Get("slots/:doctorId")
  @ApiOperation({ summary: "Get available slots for a doctor" })
  getAvailableSlots(
    @Param("doctorId") doctorId: string,
    @Query("date") date: string,
  ) {
    return this.scheduleService.getAvailableSlots(doctorId, date);
  }
}
