import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("admin", 10);

  // Upsert Super Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@edusync.com" },
    update: { password_hash: passwordHash },
    create: {
      email: "admin@edusync.com",
      name: "Super Admin",
      password_hash: passwordHash,
      role: "super-admin",
      status: "active",
      phone: "+1234567890",
    },
  });

  console.log("Admin user seeded:", admin.email);

  // Create a sample School
  const school = await prisma.school.create({
    data: {
      name: "EduSync International Academy",
      address: "123 Education Lane",
      phone: "+1987654321",
      email: "contact@edusync.com",
      website: "https://edusync.com",
    },
  });
  console.log("School seeded:", school.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
