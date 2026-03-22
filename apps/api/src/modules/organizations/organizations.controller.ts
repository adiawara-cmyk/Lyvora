import { Controller, Get, Post, Body, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { OrganizationsService } from "./organizations.service";

@ApiTags("organizations")
@Controller("organizations")
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ORG" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get my organization profile" })
  getProfile(@Request() req: any) {
    return this.organizationsService.getProfile(req.user.id);
  }

  @Post("missions")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ORG" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a medical mission" })
  createMission(
    @Request() req: any,
    @Body()
    body: {
      title: string;
      description?: string;
      latitude: number;
      longitude: number;
      address: string;
      startDate: string;
      endDate: string;
      volunteersNeeded: number;
    },
  ) {
    return this.organizationsService.createMission(req.user.id, body);
  }

  @Get("missions")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ORG" as any)
  @ApiBearerAuth()
  @ApiOperation({ summary: "List my organization missions" })
  listMissions(@Request() req: any) {
    return this.organizationsService.listMissions(req.user.id);
  }

  @Get("missions/all")
  @ApiOperation({ summary: "List all active medical missions (public)" })
  listAllMissions() {
    return this.organizationsService.listAllMissions();
  }
}
