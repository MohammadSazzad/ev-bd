import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

let prismaInstance = globalForPrisma.prisma;

function getPrisma(): PrismaClient {
    if (!prismaInstance) {
        if (!connectionString) {
            throw new Error("DATABASE_URL is not configured");
        }
        const adapter = new PrismaPg({ connectionString });
        prismaInstance = new PrismaClient({ adapter });
        if (process.env.NODE_ENV !== "production") {
            globalForPrisma.prisma = prismaInstance;
        }
    }
    return prismaInstance;
}

export const prisma = new Proxy({} as PrismaClient, {
    get(_target, property, receiver) {
        const client = getPrisma();
        const value = Reflect.get(client, property, receiver);
        return typeof value === "function" ? value.bind(client) : value;
    },
});
