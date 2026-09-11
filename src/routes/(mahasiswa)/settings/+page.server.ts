import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { verifyPassword, hashPassword } from '$lib/server/auth';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/login');

  const db = getDb();
  let profile = null;
  let studyPrograms: any[] = [];

  try {
    const [profileRows]: any = await db.query(
      `SELECT sp.*, u.name as full_name, u.email 
       FROM users u
       LEFT JOIN student_profiles sp ON u.id = sp.user_id 
       WHERE u.id = ?`,
      [locals.user.id]
    );

    if (profileRows && profileRows.length > 0) {
      profile = profileRows[0];
    }

    const [prodiRows]: any = await db.query('SELECT * FROM study_programs ORDER BY name ASC');
    studyPrograms = prodiRows || [];
  } catch (err) {
    console.error('Settings Load Error:', err);
  }

  return {
    profile,
    studyPrograms,
    user: locals.user
  };
};

export const actions: Actions = {
  updateProfile: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });

    const data = await request.formData();
    const fullName = (data.get('fullName') as string)?.trim();
    const whatsapp = (data.get('whatsapp') as string)?.trim();
    const programStudi = (data.get('programStudi') as string)?.trim();
    const semester = (data.get('semester') as string)?.trim();

    if (!fullName) {
      return fail(400, { profileError: 'Nama lengkap wajib diisi.' });
    }

    try {
      const db = getDb();

      // Update name in users
      await db.execute('UPDATE users SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [
        fullName,
        locals.user.id
      ]);

      // Check if student_profile exists
      const [existing]: any = await db.query('SELECT id FROM student_profiles WHERE user_id = ?', [
        locals.user.id
      ]);

      if (existing && existing.length > 0) {
        await db.execute(
          `UPDATE student_profiles 
           SET whatsapp = ?, program_studi = ?, semester = ?, updated_at = CURRENT_TIMESTAMP 
           WHERE user_id = ?`,
          [whatsapp, programStudi, semester, locals.user.id]
        );
      } else {
        await db.execute(
          `INSERT INTO student_profiles (user_id, whatsapp, program_studi, semester) 
           VALUES (?, ?, ?, ?)`,
          [locals.user.id, whatsapp, programStudi, semester]
        );
      }

      return { profileSuccess: 'Profil Anda berhasil diperbarui!' };
    } catch (e: any) {
      console.error('Update Profile Error:', e);
      return fail(500, { profileError: 'Gagal memperbarui profil: ' + (e.message || 'Unknown error') });
    }
  },

  changePassword: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });

    const data = await request.formData();
    const currentPassword = data.get('currentPassword') as string;
    const newPassword = data.get('newPassword') as string;
    const confirmPassword = data.get('confirmPassword') as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return fail(400, { passwordError: 'Semua kolom password wajib diisi.' });
    }

    if (newPassword.length < 8) {
      return fail(400, { passwordError: 'Password baru minimal 8 karakter.' });
    }

    if (newPassword !== confirmPassword) {
      return fail(400, { passwordError: 'Konfirmasi password baru tidak cocok.' });
    }

    try {
      const db = getDb();
      const [rows]: any = await db.query('SELECT password FROM users WHERE id = ?', [locals.user.id]);

      if (!rows || rows.length === 0) {
        return fail(404, { passwordError: 'User tidak ditemukan.' });
      }

      const isValid = await verifyPassword(currentPassword, rows[0].password);
      if (!isValid) {
        return fail(400, { passwordError: 'Password saat ini salah.' });
      }

      const hashedPassword = await hashPassword(newPassword);
      await db.execute('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [
        hashedPassword,
        locals.user.id
      ]);

      return { passwordSuccess: 'Password berhasil diubah!' };
    } catch (e: any) {
      console.error('Change Password Error:', e);
      return fail(500, { passwordError: 'Gagal mengubah password: ' + (e.message || 'Unknown error') });
    }
  }
};
