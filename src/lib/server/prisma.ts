import { PrismaClient } from '@prisma/client';

// Support both POSTGRES_URL (Vercel default) and DATABASE_URL (Prisma standard)
const connectionUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionUrl
    }
  }
});

export default prisma;
