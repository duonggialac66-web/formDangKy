import { neon } from "@neondatabase/serverless";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";

// Prisma 7.7.0 configuration - Sync with phone-store
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL?.trim() || "postgres://localhost:5432/placeholder";
  
  const adapter = new PrismaNeonHttp(connectionString, {
    fetchOptions: {
      cache: 'no-store'
    }
  });

  return new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

