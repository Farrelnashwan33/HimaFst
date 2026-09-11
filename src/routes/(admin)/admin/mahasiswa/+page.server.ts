import { fail } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  const db = getDb();
  try {
    const [students]: any = await db.query(`
      SELECT 
        u.id as user_id, 
        u.name, 
        u.email, 
        u.role, 
        u.created_at, 
        sp.id as profile_id, 
        sp.nim, 
        sp.program_studi, 
        sp.whatsapp, 
        sp.semester, 
        sp.avatar_url 
      FROM users u 
      LEFT JOIN student_profiles sp ON u.id = sp.user_id 
      WHERE u.role = 'mahasiswa' 
      ORDER BY u.id DESC
    `);

    const [prodis]: any = await db.query('SELECT name FROM study_programs ORDER BY name ASC');

    return {
      students: students || [],
      prodis: (prodis || []).map((p: any) => p.name)
    };
  } catch (e) {
    console.error('Error loading students:', e);
    return { students: [], prodis: [] };
  }
};

export const actions: Actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();
    const userId = Number(data.get('userId'));
    const name = (data.get('name') as string)?.trim();
    const nim = (data.get('nim') as string)?.trim();
    const programStudi = (data.get('programStudi') as string)?.trim();
    const whatsapp = (data.get('whatsapp') as string)?.trim();
    const semester = (data.get('semester') as string)?.trim();

    if (!userId || !name) {
      return fail(400, { error: 'ID user dan nama wajib diisi.' });
    }

    try {
      const db = getDb();
      await db.execute('UPDATE users SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [
        name,
        userId
      ]);

      const [existing]: any = await db.query('SELECT id FROM student_profiles WHERE user_id = ?', [
        userId
      ]);

      if (existing && existing.length > 0) {
        await db.execute(
          `UPDATE student_profiles 
           SET nim = ?, program_studi = ?, whatsapp = ?, semester = ?, updated_at = CURRENT_TIMESTAMP 
           WHERE user_id = ?`,
          [nim, programStudi, whatsapp, semester, userId]
        );
      } else {
        await db.execute(
          `INSERT INTO student_profiles (user_id, nim, program_studi, whatsapp, semester) 
           VALUES (?, ?, ?, ?, ?)`,
          [userId, nim, programStudi, whatsapp, semester]
        );
      }

      if (locals.user?.id) {
        await db.execute(
          'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)',
          [locals.user.id, 'UPDATE', 'Mahasiswa', `Admin memperbarui data mahasiswa: ${name} (${nim || 'No NIM'})`]
        );
      }

      return { success: true, message: 'Data mahasiswa berhasil diperbarui.' };
    } catch (e: any) {
      console.error('Update student error:', e);
      return fail(500, { error: e.message });
    }
  },

  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const userId = Number(data.get('userId'));
    if (!userId) return fail(400, { error: 'ID Mahasiswa tidak valid' });

    try {
      const db = getDb();
      // Get student name for log
      const [u]: any = await db.query('SELECT name FROM users WHERE id = ?', [userId]);
      const studentName = u[0]?.name || `ID ${userId}`;

      await db.execute('DELETE FROM users WHERE id = ?', [userId]);

      if (locals.user?.id) {
        await db.execute(
          'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)',
          [locals.user.id, 'DELETE', 'Mahasiswa', `Admin menghapus akun mahasiswa: ${studentName}`]
        );
      }

      return { success: true, message: 'Akun mahasiswa berhasil dihapus.' };
    } catch (e: any) {
      return fail(500, { error: e.message });
    }
  }
};
