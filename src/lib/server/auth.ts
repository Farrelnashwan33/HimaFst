import bcrypt from 'bcrypt';
import { getDb } from './db';
import crypto from 'crypto';

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

  const db = getDb();
  await db.query(
    'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)',
    [sessionId, userId, expiresAt]
  );

  return sessionId;
}

export async function validateSession(sessionId: string): Promise<{
  session: { id: string, userId: number, expiresAt: Date } | null,
  user: { id: number, email: string, role: string } | null
}> {
  const db = getDb();
  const [sessionRows]: any = await db.query(
    'SELECT * FROM sessions WHERE id = ?',
    [sessionId]
  );

  if (sessionRows.length === 0) {
    return { session: null, user: null };
  }

  const session = sessionRows[0];
  const expiresAt = new Date(session.expires_at);

  if (expiresAt.getTime() < Date.now()) {
    await db.query('DELETE FROM sessions WHERE id = ?', [sessionId]);
    return { session: null, user: null };
  }

  // Extend session if it's less than 15 days from expiring
  if (expiresAt.getTime() - Date.now() < 1000 * 60 * 60 * 24 * 15) {
    expiresAt.setDate(expiresAt.getDate() + 15);
    await db.query('UPDATE sessions SET expires_at = ? WHERE id = ?', [expiresAt, sessionId]);
  }

  const [userRows]: any = await db.query(
    'SELECT id, email, role FROM users WHERE id = ?',
    [session.user_id]
  );

  if (userRows.length === 0) {
    await db.query('DELETE FROM sessions WHERE id = ?', [sessionId]);
    return { session: null, user: null };
  }

  return {
    session: {
      id: session.id,
      userId: session.user_id,
      expiresAt
    },
    user: userRows[0]
  };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  const db = getDb();
  await db.query('DELETE FROM sessions WHERE id = ?', [sessionId]);
}
