import {
  Controller,
  Get,
  Patch,
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
import { DoctorsService } from "./doctors.service";
import { SearchDoctorsDto } from "./dto/search-doctors.dto";
import { AppointmentType } from "@prisma/client";

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

  @Get(":id/profile")
  @ApiOperation({ summary: "Get full public doctor profile" })
  getFullProfile(@Param("id") id: string) {
    return this.doctorsService.getFullProfile(id);
  }

  @Get(":id/fees")
  @ApiOperation({ summary: "Get doctor fees" })
  getFees(@Param("id") id: string) {
    return this.doctorsService.getFees(id);
  }

  @Get(":id/reviews")
  @ApiOperation({ summary: "Get doctor reviews" })
  getReviews(@Param("id") id: string) {
    return this.doctorsService.getReviews(id);
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

  @Patch("fees")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("DOCTOR" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Set my consultation fees" })
  setFees(
    @Request() req: any,
    @Body()
    body: {
      fees: {
        consultationType: AppointmentType;
        label?: string;
        amount: number;
        currency?: string;
      }[];
    },
  ) {
    return this.doctorsService.setFees(req.user.id, body.fees);
  }

  @Post(":id/reviews")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("PATIENT" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Leave a review for a doctor" })
  createReview(
    @Request() req: any,
    @Param("id") id: string,
    @Body() body: { rating: number; comment?: string },
  ) {
    return this.doctorsService.createReview(
      req.user.id,
      id,
      body.rating,
      body.comment,
    );
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
