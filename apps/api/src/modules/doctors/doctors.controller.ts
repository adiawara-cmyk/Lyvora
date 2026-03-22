import {
  Controller, Get, Patch, Post, Body, Param, Query, UseGuards, Request,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { DoctorsService } from "./doctors.service";
import { SearchDoctorsDto } from "./dto/search-doctors.dto";

@ApiTags("doctors")
@Controller("doctors")
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: "Search doctors by location and filters" })
  search(@Query() dto: SearchDoctorsDto) {
    return this.doctorsService.search(dto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get doctor profile by ID" })
  findById(@Param("id") id: string) {
    return this.doctorsService.findById(id);
  }

  @Patch("profile")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("DOCTOR" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update my doctor profile" })
  updateProfile(
    @Request() req: any,
    @Body()
    body: {
      specialties?: string[];
      languages?: string[];
      bio?: string;
      licenseNumber?: string;
      licenseCountry?: string;
    },
  ) {
    return this.doctorsService.updateProfile(req.user.id, body);
  }

  @Post("availability")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("DOCTOR" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Toggle availability and update location" })
  toggleAvailability(
    @Request() req: any,
    @Body()
    body: {
      isAvailable: boolean;
      latitude?: number;
      longitude?: number;
      address?: string;
      consultationType?: "IN_PERSON" | "TELECONSULT" | "BOTH";
    },
  ) {
    return this.doctorsService.toggleAvailability(req.user.id, body);
  }

  @Get("me/availability")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("DOCTOR" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get my current availability" })
  getAvailability(@Request() req: any) {
    return this.doctorsService.getAvailability(req.user.id);
  }
}
