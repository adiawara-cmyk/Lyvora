import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../database/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role,
      },
    });

    // Create role-specific profile
    if (dto.role === "DOCTOR") {
      await this.prisma.doctorProfile.create({
        data: {
          userId: user.id,
          specialties: [],
          languages: [],
          licenseNumber: "",
          licenseCountry: "",
          diplomaUrls: [],
        },
      });
    } else if (dto.role === "PATIENT") {
      await this.prisma.patient.create({
        data: { userId: user.id },
      });
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>(
          "JWT_REFRESH_SECRET",
          "change-me-in-production-refresh",
        ),
      });
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user) throw new UnauthorizedException("User not found");

      return this.generateTokens(user.id, user.email, user.role);
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        avatar: true,
        locale: true,
        emailVerified: true,
        createdAt: true,
      },
    });
    if (!user) throw new UnauthorizedException("User not found");
    return user;
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>(
          "JWT_REFRESH_SECRET",
          "change-me-in-production-refresh",
        ),
        expiresIn: "7d",
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
