import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { DocumentsService } from "./documents.service";
import { DocumentType } from "@prisma/client";

@ApiTags("documents")
@Controller("documents")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post("upload")
  @ApiOperation({ summary: "Upload a document" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  upload(
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      type: DocumentType;
      appointmentId?: string;
      description?: string;
    },
  ) {
    return this.documentsService.upload(
      req.user.id,
      file,
      body.type,
      body.appointmentId,
      body.description,
    );
  }

  @Get()
  @ApiOperation({ summary: "List my documents" })
  listMine(@Request() req: any) {
    return this.documentsService.listByUser(req.user.id);
  }

  @Get("appointment/:appointmentId")
  @ApiOperation({ summary: "List documents for an appointment" })
  listByAppointment(@Param("appointmentId") appointmentId: string) {
    return this.documentsService.listByAppointment(appointmentId);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a document" })
  delete(@Request() req: any, @Param("id") id: string) {
    return this.documentsService.delete(id, req.user.id);
  }
}
