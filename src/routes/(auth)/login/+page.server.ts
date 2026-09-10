import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { verifyPassword, createSession } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      return fail(400, { email, error: 'Email and password are required' });
    }

    try {
      const db = getDb();
      const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      
      if (rows.length === 0) {
        return fail(400, { email, error: 'Invalid email or password' });
      }

      const user = rows[0];

      if (user.role !== 'mahasiswa' && user.role !== 'admin') {
        return fail(403, { email, error: 'Access denied.' });
      }

      const validPassword = await verifyPassword(password, user.password_hash);
      if (!validPassword) {
        return fail(400, { email, error: 'Invalid email or password' });
      }

      const sessionId = await createSession(user.id);
      
      cookies.set('session_id', sessionId, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        secure: process.env.NODE_ENV === 'production'
      });

      if (user.role === 'admin') {
        throw redirect(302, '/admin/dashboard');
      }

    } catch (e) {
      if (e instanceof Error && e.message.startsWith('Not found:')) throw e;
      if (e && typeof e === 'object' && 'status' in e && e.status === 302) throw e;
      console.error(e);
      return fail(500, { email, error: 'Internal server error' });
    }

    throw redirect(302, '/dashboard');
  }
};
