import { Controller, Post, Get, Body, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @ApiOperation({ summary: "Login with email and password" })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh access token" })
  refresh(@Body("refreshToken") refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user profile" })
  getMe(@Request() req: any) {
    return this.authService.getMe(req.user.id);
  }
}
