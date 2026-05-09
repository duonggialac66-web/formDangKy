import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";

// Prisma 7.7.0 configuration - Sync with phone-store
const prismaClientSingleton = () => {
  const rawUrl = process.env.DATABASE_URL;
  
  // Kiểm tra nếu DATABASE_URL không phải là string (có thể bị ghi đè bởi function)
  const connectionString = (typeof rawUrl === "string" ? rawUrl.trim() : null) || "postgres://localhost:5432/placeholder";
  
  // Trong Prisma 7.7.0, PrismaNeonHttp nhận trực tiếp connectionString (string)
  const adapter = new PrismaNeonHttp(connectionString, {
    fetchOptions: {
      cache: 'no-store'
    }
  });

  return new PrismaClient({ 
    adapter: adapter as any, 
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

