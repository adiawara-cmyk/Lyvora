import { Controller, Get, Patch, Body, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { PatientsService } from "./patients.service";

@ApiTags("patients")
@Controller("patients")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("PATIENT" as any)
@ApiBearerAuth()
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get("me")
  @ApiOperation({ summary: "Get my patient profile" })
  getProfile(@Request() req: any) {
    return this.patientsService.getProfile(req.user.id);
  }

  @Patch("me")
  @ApiOperation({ summary: "Update my patient profile" })
  updateProfile(
    @Request() req: any,
    @Body() body: { dateOfBirth?: Date; gender?: string; emergencyContact?: string; insuranceInfo?: string },
  ) {
    return this.patientsService.updateProfile(req.user.id, body);
  }
}
