import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import prisma from './prisma';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createSession(userId: number): Promise<string> {
  const sessionId = generateSessionId();
  // Session valid for 30 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt
    }
  });

  return sessionId;
}

export async function validateSession(sessionId: string): Promise<{
  session: { id: string, userId: number, expiresAt: Date } | null,
  user: { id: number, email: string, role: string } | null
}> {
  const sessionData = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  });

  if (!sessionData) {
    return { session: null, user: null };
  }

  const expiresAt = new Date(sessionData.expiresAt);

  if (expiresAt.getTime() < Date.now()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }

  // Extend session if it's less than 15 days from expiring
  if (expiresAt.getTime() - Date.now() < 1000 * 60 * 60 * 24 * 15) {
    expiresAt.setDate(expiresAt.getDate() + 15);
    await prisma.session.update({
      where: { id: sessionId },
      data: { expiresAt }
    });
  }

  return {
    session: {
      id: sessionData.id,
      userId: sessionData.userId,
      expiresAt
    },
    user: {
      id: sessionData.user.id,
      email: sessionData.user.email,
      role: sessionData.user.role
    }
  };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  try {
    await prisma.session.delete({ where: { id: sessionId } });
  } catch (e) {
    // Ignore error if session doesn't exist
  }
}
