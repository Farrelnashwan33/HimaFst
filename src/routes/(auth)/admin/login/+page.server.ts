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
      return fail(400, { email, error: 'Email dan password wajib diisi' });
    }

    try {
      const db = getDb();
      const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      
      if (rows.length === 0) {
        return fail(400, { email, error: 'Email atau password tidak valid' });
      }

      const user = rows[0];

      if (user.role !== 'admin') {
        return fail(403, { email, error: 'Akses ditolak. Memerlukan hak akses Administrator.' });
      }

      const userHash = user.password || user.password_hash;
      const validPassword = userHash ? await verifyPassword(password, userHash) : false;
      if (!validPassword) {
        return fail(400, { email, error: 'Email atau password tidak valid' });
      }

      const sessionId = await createSession(user.id);
      
      cookies.set('session_id', sessionId, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        secure: process.env.NODE_ENV === 'production'
      });

    } catch (e: any) {
      if (e && typeof e === 'object' && 'status' in e && e.status === 302) throw e;
      console.error('ADMIN LOGIN ERROR:', e);
      return fail(500, { email, error: 'Terjadi kesalahan server: ' + (e.message || 'Unknown error') });
    }

    throw redirect(302, '/admin/dashboard');
  }
};

