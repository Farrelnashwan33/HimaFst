import { getDb } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/login');

  const db = getDb();
  let profile = null;

  if (locals.user.role === 'mahasiswa') {
    const [profileRows]: any = await db.query(
      `SELECT sp.*, sp.program_studi as prodi_name, u.name as full_name, u.email 
       FROM student_profiles sp 
       JOIN users u ON sp.user_id = u.id 
       WHERE sp.user_id = ?`,
      [locals.user.id]
    );
    if (profileRows.length > 0) {
      profile = profileRows[0];
    } else {
      // Fallback if profile row hasn't been created yet
      const [uRows]: any = await db.query('SELECT name as full_name, email FROM users WHERE id = ?', [locals.user.id]);
      if (uRows.length > 0) {
        profile = { full_name: uRows[0].full_name, email: uRows[0].email };
      }
    }
  }

  return {
    profile,
    user: locals.user
  };
};
