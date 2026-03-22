import {
  Controller, Get, Patch, Body, Param, Query, UseGuards, Request,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("me")
  @ApiOperation({ summary: "Get my profile" })
  getMe(@Request() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @Patch("me")
  @ApiOperation({ summary: "Update my profile" })
  updateMe(
    @Request() req: any,
    @Body() body: { firstName?: string; lastName?: string; phone?: string; locale?: string },
  ) {
    return this.usersService.updateProfile(req.user.id, body);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles("ADMIN" as any)
  @ApiOperation({ summary: "List all users (admin only)" })
  listUsers(@Query("page") page?: string, @Query("limit") limit?: string) {
    return this.usersService.listUsers(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  @Get(":id")
  @UseGuards(RolesGuard)
  @Roles("ADMIN" as any)
  @ApiOperation({ summary: "Get user by ID (admin only)" })
  findById(@Param("id") id: string) {
    return this.usersService.findById(id);
  }
}
