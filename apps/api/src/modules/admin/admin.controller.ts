import { Controller, Get, Patch, Param, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { AdminService } from "./admin.service";

@ApiTags("admin")
@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN" as any)
@ApiBearerAuth()
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("pending-validations")
  @ApiOperation({ summary: "Get pending doctor/org validations" })
  getPendingValidations() {
    return this.adminService.getPendingValidations();
  }

  @Patch("doctors/:id/verify")
  @ApiOperation({ summary: "Verify or reject a doctor" })
  verifyDoctor(
    @Param("id") id: string,
    @Body("status") status: "VERIFIED" | "REJECTED",
  ) {
    return this.adminService.verifyDoctor(id, status);
  }

  @Get("recent-activity")
  @ApiOperation({ summary: "Get recent platform activity" })
  getRecentActivity() {
    return this.adminService.getRecentActivity();
  }

  @Get("stats")
  @ApiOperation({ summary: "Get admin dashboard stats" })
  getStats() {
    return this.adminService.getDashboardStats();
  }
}
