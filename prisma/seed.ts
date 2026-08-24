import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const roles = [
  {
    name: "ADMIN",
    description: "Full access to platform administration",
  },
  {
    name: "EDITOR",
    description: "Can manage vehicle, showroom, and media content",
  },
  {
    name: "MODERATOR",
    description: "Can manage vehicle, showroom, and media content",
  },
  {
    name: "SHOWROOM",
    description: "Can manage vehicle",
  },
  {
    name: "USER",
    description: "Standard platform user",
  },
];

async function main() {
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
  }

  console.log(`Seeded ${roles.length} roles.`);
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
