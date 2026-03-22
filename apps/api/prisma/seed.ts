import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("Password123!", 12);

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@lyvora.com" },
    update: {},
    create: {
      email: "admin@lyvora.com",
      passwordHash,
      firstName: "Admin",
      lastName: "Lyvora",
      role: "ADMIN",
      emailVerified: true,
    },
  });
  console.log(`Admin: ${admin.email}`);

  // Doctors
  const doctors = [
    {
      email: "marie.dubois@lyvora.com",
      firstName: "Marie",
      lastName: "Dubois",
      specialties: ["Cardiologie", "M\u00e9decine g\u00e9n\u00e9rale"],
      languages: ["fr", "en"],
      licenseNumber: "FR-12345",
      licenseCountry: "France",
      bio: "Cardiologue exp\u00e9riment\u00e9e, 15 ans de pratique",
      yearsExperience: 15,
      lat: 48.8566,
      lng: 2.3522,
      city: "Paris",
    },
    {
      email: "amadou.diallo@lyvora.com",
      firstName: "Amadou",
      lastName: "Diallo",
      specialties: ["P\u00e9diatrie"],
      languages: ["fr", "wo"],
      licenseNumber: "SN-67890",
      licenseCountry: "S\u00e9n\u00e9gal",
      bio: "P\u00e9diatre d\u00e9vou\u00e9, sp\u00e9cialiste en sant\u00e9 infantile",
      yearsExperience: 10,
      lat: 14.6928,
      lng: -17.4467,
      city: "Dakar",
    },
    {
      email: "elena.rodriguez@lyvora.com",
      firstName: "Elena",
      lastName: "Rodriguez",
      specialties: ["Gyn\u00e9cologie"],
      languages: ["es", "en", "fr"],
      licenseNumber: "ES-11111",
      licenseCountry: "Espagne",
      bio: "Gyn\u00e9cologue avec expertise en sant\u00e9 f\u00e9minine",
      yearsExperience: 12,
      lat: 40.4168,
      lng: -3.7038,
      city: "Madrid",
    },
    {
      email: "kenji.tanaka@lyvora.com",
      firstName: "Kenji",
      lastName: "Tanaka",
      specialties: ["Orthop\u00e9die"],
      languages: ["ja", "en"],
      licenseNumber: "JP-22222",
      licenseCountry: "Japon",
      bio: "Chirurgien orthop\u00e9diste, sp\u00e9cialiste du sport",
      yearsExperience: 8,
      lat: 35.6762,
      lng: 139.6503,
      city: "Tokyo",
    },
    {
      email: "fatima.almansouri@lyvora.com",
      firstName: "Fatima",
      lastName: "Al-Mansouri",
      specialties: ["Dermatologie"],
      languages: ["ar", "en", "fr"],
      licenseNumber: "AE-33333",
      licenseCountry: "\u00c9mirats arabes unis",
      bio: "Dermatologue, sp\u00e9cialiste en dermatologie esth\u00e9tique",
      yearsExperience: 9,
      lat: 25.2048,
      lng: 55.2708,
      city: "Dubai",
    },
  ];

  for (const doc of doctors) {
    const user = await prisma.user.upsert({
      where: { email: doc.email },
      update: {},
      create: {
        email: doc.email,
        passwordHash,
        firstName: doc.firstName,
        lastName: doc.lastName,
        role: "DOCTOR",
        emailVerified: true,
      },
    });

    const profile = await prisma.doctorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        specialties: doc.specialties,
        languages: doc.languages,
        licenseNumber: doc.licenseNumber,
        licenseCountry: doc.licenseCountry,
        diplomaUrls: [],
        verificationStatus: "VERIFIED",
        bio: doc.bio,
        yearsExperience: doc.yearsExperience,
      },
    });

    await prisma.doctorAvailability.upsert({
      where: { doctorId: profile.id },
      update: {},
      create: {
        doctorId: profile.id,
        isAvailable: doc.email !== "elena.rodriguez@lyvora.com",
        latitude: doc.lat,
        longitude: doc.lng,
        address: doc.city,
        consultationType: "BOTH",
      },
    });

    console.log(`Doctor: Dr. ${doc.firstName} ${doc.lastName} (${doc.city})`);
  }

  // Patients
  const patients = [
    { email: "jean.martin@lyvora.com", firstName: "Jean", lastName: "Martin" },
    { email: "aisha.bah@lyvora.com", firstName: "Aisha", lastName: "Bah" },
  ];

  for (const p of patients) {
    const user = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        email: p.email,
        passwordHash,
        firstName: p.firstName,
        lastName: p.lastName,
        role: "PATIENT",
        emailVerified: true,
      },
    });

    await prisma.patient.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });

    console.log(`Patient: ${p.firstName} ${p.lastName}`);
  }

  // Organizations
  const orgs = [
    {
      email: "msf@lyvora.com",
      firstName: "MSF",
      lastName: "France",
      name: "M\u00e9decins Sans Fronti\u00e8res - Section France",
      type: "NGO" as const,
      region: "Paris, France",
    },
    {
      email: "sante.mali@lyvora.com",
      firstName: "Minist\u00e8re",
      lastName: "Sant\u00e9",
      name: "Minist\u00e8re de la Sant\u00e9 - Mali",
      type: "MUNICIPALITY" as const,
      region: "Bamako, Mali",
    },
  ];

  for (const o of orgs) {
    const user = await prisma.user.upsert({
      where: { email: o.email },
      update: {},
      create: {
        email: o.email,
        passwordHash,
        firstName: o.firstName,
        lastName: o.lastName,
        role: "ORG",
        emailVerified: true,
      },
    });

    await prisma.organization.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        name: o.name,
        type: o.type,
        region: o.region,
      },
    });

    console.log(`Organization: ${o.name}`);
  }

  console.log("\nSeed completed! All accounts use password: Password123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
