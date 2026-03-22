export enum UserRole {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
  ORG = "ORG",
}

export enum VerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export enum ConsultationType {
  IN_PERSON = "IN_PERSON",
  TELECONSULT = "TELECONSULT",
  BOTH = "BOTH",
}

export enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum AppointmentType {
  IN_PERSON = "IN_PERSON",
  TELECONSULT = "TELECONSULT",
}

export enum SubscriptionTier {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

export enum OrgType {
  MUNICIPALITY = "MUNICIPALITY",
  NGO = "NGO",
  HOSPITAL = "HOSPITAL",
}
