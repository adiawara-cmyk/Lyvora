import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { DocumentType } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { v4 as uuid } from "uuid";

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async upload(
    userId: string,
    file: Express.Multer.File,
    type: DocumentType,
    appointmentId?: string,
    description?: string,
  ) {
    const uploadsDir = path.resolve("uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.originalname);
    const fileName = `${uuid()}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    return this.prisma.document.create({
      data: {
        type,
        fileName: file.originalname,
        fileUrl: `/uploads/${fileName}`,
        fileSize: file.size,
        mimeType: file.mimetype,
        uploadedById: userId,
        appointmentId: appointmentId || null,
        description: description || null,
      },
    });
  }

  async listByUser(userId: string) {
    const documents = await this.prisma.document.findMany({
      where: { uploadedById: userId },
      orderBy: { createdAt: "desc" },
    });
    return { documents, total: documents.length };
  }

  async listByAppointment(appointmentId: string) {
    const documents = await this.prisma.document.findMany({
      where: { appointmentId },
      orderBy: { createdAt: "desc" },
    });
    return { documents, total: documents.length };
  }

  async findById(id: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException("Document not found");
    return doc;
  }

  async delete(id: string, userId: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException("Document not found");
    if (doc.uploadedById !== userId) {
      throw new ForbiddenException("You can only delete your own documents");
    }

    // Delete physical file
    const filePath = path.resolve(`.${doc.fileUrl}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return this.prisma.document.delete({ where: { id } });
  }
}
