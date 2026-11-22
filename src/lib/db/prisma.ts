import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({ connectionString });

// During Next.js development, the global singleton can outlive a generated
// Prisma Client change. Recreate it when the current schema model is missing.
const cachedPrisma = globalForPrisma.prisma;
const hasCurrentSchema = cachedPrisma && "permission" in (cachedPrisma as object);

export const prisma =
    hasCurrentSchema ? cachedPrisma : new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
