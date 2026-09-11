import { fail } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { hashPassword } from '$lib/server/auth';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = (data.get('email') as string)?.trim();
    const nim = (data.get('nim') as string)?.trim();
    const newPassword = data.get('newPassword') as string;
    const confirmPassword = data.get('confirmPassword') as string;

    const values = { email, nim };

    if (!email || !nim || !newPassword || !confirmPassword) {
      return fail(400, { ...values, error: 'Semua kolom wajib diisi.' });
    }

    if (newPassword.length < 8) {
      return fail(400, { ...values, error: 'Password baru minimal 8 karakter.' });
    }

    if (newPassword !== confirmPassword) {
      return fail(400, { ...values, error: 'Konfirmasi password baru tidak cocok.' });
    }

    try {
      const db = getDb();
      const [rows]: any = await db.query(
        `SELECT u.id, u.email, u.role, sp.nim 
         FROM users u 
         LEFT JOIN student_profiles sp ON u.id = sp.user_id 
         WHERE LOWER(u.email) = LOWER(?)`,
        [email]
      );

      if (!rows || rows.length === 0) {
        return fail(400, { ...values, error: 'Akun dengan email tersebut tidak ditemukan.' });
      }

      const user = rows[0];

      // Verifikasi NIM untuk mahasiswa
      if (user.role === 'mahasiswa') {
        const userNim = (user.nim || '').toString().trim();
        if (!userNim || userNim.toLowerCase() !== nim.toLowerCase()) {
          return fail(400, { ...values, error: 'Kombinasi Email dan NIM tidak sesuai dengan data terdaftar.' });
        }
      }

      // Hash password baru
      const hashedPassword = await hashPassword(newPassword);

      // Update password di database
      await db.execute(
        'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [hashedPassword, user.id]
      );

      // Invalidate sesi lama untuk keamanan
      await db.execute('DELETE FROM sessions WHERE user_id = ?', [user.id]);

      return {
        success: true,
        message: 'Password berhasil direset! Silakan login menggunakan password baru Anda.'
      };

    } catch (e: any) {
      console.error('RESET PASSWORD ERROR:', e);
      return fail(500, { ...values, error: 'Terjadi kesalahan sistem: ' + (e.message || 'Unknown error') });
    }
  }
};
