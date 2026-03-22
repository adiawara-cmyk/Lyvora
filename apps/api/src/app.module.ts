import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthController } from "./health.controller";
import { PrismaModule } from "./database/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { DoctorsModule } from "./modules/doctors/doctors.module";
import { PatientsModule } from "./modules/patients/patients.module";
import { AppointmentsModule } from "./modules/appointments/appointments.module";
import { OrganizationsModule } from "./modules/organizations/organizations.module";
import { StatsModule } from "./modules/stats/stats.module";
import { AdminModule } from "./modules/admin/admin.module";
import { DocumentsModule } from "./modules/documents/documents.module";
import { ScheduleModule } from "./modules/schedule/schedule.module";
import { VideoModule } from "./modules/video/video.module";
import { CabinetsModule } from "./modules/cabinets/cabinets.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DoctorsModule,
    PatientsModule,
    AppointmentsModule,
    OrganizationsModule,
    StatsModule,
    AdminModule,
    DocumentsModule,
    ScheduleModule,
    VideoModule,
    CabinetsModule,
    NotificationsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
