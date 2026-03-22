import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>("SMTP_HOST", "smtp.gmail.com"),
      port: this.configService.get<number>("SMTP_PORT", 587),
      secure: this.configService.get<boolean>("SMTP_SECURE", false),
      auth: {
        user: this.configService.get<string>("SMTP_USER"),
        pass: this.configService.get<string>("SMTP_PASS"),
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      const from = this.configService.get<string>(
        "SMTP_FROM",
        "Lyvora <noreply@lyvora.com>",
      );
      await this.transporter.sendMail({ from, to, subject, html });
      this.logger.log(`Email sent to ${to}: ${subject}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error}`);
      throw error;
    }
  }

  async sendAppointmentConfirmation(
    email: string,
    patientName: string,
    doctorName: string,
    date: string,
    type: string,
  ) {
    const subject = "Appointment Confirmed - Lyvora";
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Appointment Confirmed</h2>
        <p>Hello <strong>${patientName}</strong>,</p>
        <p>Your appointment has been confirmed with the following details:</p>
        <ul>
          <li><strong>Doctor:</strong> ${doctorName}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Type:</strong> ${type}</li>
        </ul>
        <p>Please be on time. If you need to cancel, please do so at least 24 hours in advance.</p>
        <p>Best regards,<br/>The Lyvora Team</p>
      </div>
    `;
    return this.sendEmail(email, subject, html);
  }

  async sendAppointmentReminder(
    email: string,
    patientName: string,
    doctorName: string,
    date: string,
  ) {
    const subject = "Appointment Reminder - Lyvora";
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Appointment Reminder</h2>
        <p>Hello <strong>${patientName}</strong>,</p>
        <p>This is a reminder that you have an upcoming appointment:</p>
        <ul>
          <li><strong>Doctor:</strong> ${doctorName}</li>
          <li><strong>Date:</strong> ${date}</li>
        </ul>
        <p>Please make sure to be available at the scheduled time.</p>
        <p>Best regards,<br/>The Lyvora Team</p>
      </div>
    `;
    return this.sendEmail(email, subject, html);
  }

  async sendAppointmentCancellation(
    email: string,
    name: string,
    doctorName: string,
    date: string,
  ) {
    const subject = "Appointment Cancelled - Lyvora";
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Appointment Cancelled</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your appointment has been cancelled:</p>
        <ul>
          <li><strong>Doctor:</strong> ${doctorName}</li>
          <li><strong>Date:</strong> ${date}</li>
        </ul>
        <p>If you did not request this cancellation, please contact us immediately.</p>
        <p>Best regards,<br/>The Lyvora Team</p>
      </div>
    `;
    return this.sendEmail(email, subject, html);
  }

  async sendReplacementNotification(
    email: string,
    cabinetName: string,
    specialty: string,
    dates: string,
  ) {
    const subject = "New Replacement Opportunity - Lyvora";
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Replacement Opportunity</h2>
        <p>Hello,</p>
        <p>A new replacement request has been posted that may interest you:</p>
        <ul>
          <li><strong>Cabinet:</strong> ${cabinetName}</li>
          <li><strong>Specialty:</strong> ${specialty}</li>
          <li><strong>Dates:</strong> ${dates}</li>
        </ul>
        <p>Log in to Lyvora to view details and apply.</p>
        <p>Best regards,<br/>The Lyvora Team</p>
      </div>
    `;
    return this.sendEmail(email, subject, html);
  }
}
