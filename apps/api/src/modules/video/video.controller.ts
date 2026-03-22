import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { VideoService } from "./video.service";

@ApiTags("video")
@Controller("video")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Post("room/:appointmentId")
  @ApiOperation({ summary: "Create a video room for an appointment" })
  createRoom(
    @Request() req: any,
    @Param("appointmentId") appointmentId: string,
  ) {
    return this.videoService.createRoom(appointmentId, req.user.id);
  }

  @Get("room/:appointmentId")
  @ApiOperation({ summary: "Get video room for an appointment" })
  getRoom(
    @Request() req: any,
    @Param("appointmentId") appointmentId: string,
  ) {
    return this.videoService.getRoom(appointmentId, req.user.id);
  }

  @Post("room/:appointmentId/end")
  @ApiOperation({ summary: "End a video session" })
  endSession(
    @Request() req: any,
    @Param("appointmentId") appointmentId: string,
  ) {
    return this.videoService.endSession(appointmentId, req.user.id);
  }
}
