import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CabinetsService } from "./cabinets.service";

@ApiTags("cabinets")
@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CabinetsController {
  constructor(private cabinetsService: CabinetsService) {}

  @Post("cabinets")
  @ApiOperation({ summary: "Create a cabinet" })
  create(
    @Request() req: any,
    @Body()
    body: {
      name: string;
      address: string;
      latitude: number;
      longitude: number;
      phone?: string;
      description?: string;
    },
  ) {
    return this.cabinetsService.create(req.user.id, body);
  }

  @Get("cabinets/me")
  @ApiOperation({ summary: "Get my cabinet profile" })
  getMyProfile(@Request() req: any) {
    return this.cabinetsService.getMyProfile(req.user.id);
  }

  @Post("cabinets/replacements")
  @ApiOperation({ summary: "Create a replacement request" })
  createReplacementRequest(
    @Request() req: any,
    @Body()
    body: {
      specialty: string;
      startDate: string;
      endDate: string;
      description?: string;
    },
  ) {
    return this.cabinetsService.createReplacementRequest(req.user.id, body);
  }

  @Get("cabinets/replacements")
  @ApiOperation({ summary: "List my replacement requests" })
  listMyRequests(@Request() req: any) {
    return this.cabinetsService.listMyRequests(req.user.id);
  }

  @Get("replacements")
  @UseGuards(RolesGuard)
  @Roles("DOCTOR" as any)
  @ApiOperation({ summary: "List all open replacement requests" })
  listOpenRequests() {
    return this.cabinetsService.listOpenRequests();
  }

  @Post("replacements/:id/apply")
  @UseGuards(RolesGuard)
  @Roles("DOCTOR" as any)
  @ApiOperation({ summary: "Apply to a replacement request" })
  applyToRequest(
    @Request() req: any,
    @Param("id") id: string,
    @Body() body: { message?: string },
  ) {
    return this.cabinetsService.applyToRequest(id, req.user.id, body.message);
  }

  @Patch("replacements/applications/:id")
  @ApiOperation({ summary: "Accept or reject an application" })
  handleApplication(
    @Request() req: any,
    @Param("id") id: string,
    @Body() body: { status: "ACCEPTED" | "REJECTED" },
  ) {
    return this.cabinetsService.handleApplication(id, req.user.id, body.status);
  }
}
