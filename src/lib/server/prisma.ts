import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

// Support POSTGRES_URL (Vercel standard) and DATABASE_URL (Prisma standard)
const connectionUrl = env.POSTGRES_URL || env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(connectionUrl
      ? {
          datasources: {
            db: {
              url: connectionUrl
            }
          }
        }
      : {})
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

