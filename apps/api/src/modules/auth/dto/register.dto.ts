import { IsEmail, IsString, MinLength, MaxLength, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "jean.martin@email.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "SecurePass123!" })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;

  @ApiProperty({ example: "Jean" })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({ example: "Martin" })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName!: string;

  @ApiProperty({ enum: ["PATIENT", "DOCTOR", "ORG"], example: "PATIENT" })
  @IsEnum(["PATIENT", "DOCTOR", "ORG"] as const)
  role!: "PATIENT" | "DOCTOR" | "ORG";
}
