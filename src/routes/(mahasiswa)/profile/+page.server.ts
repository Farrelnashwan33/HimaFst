import { getDb } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/login');

  const db = getDb();
  let profile = null;

  if (locals.user.role === 'mahasiswa') {
    const [profileRows]: any = await db.query(
      `SELECT sp.*, ps.name as prodi_name 
       FROM student_profiles sp 
       JOIN program_studi ps ON sp.program_studi_id = ps.id 
       WHERE sp.user_id = ?`,
      [locals.user.id]
    );
    if (profileRows.length > 0) {
      profile = profileRows[0];
    }
  }

  return {
    profile,
    user: locals.user
  };
};
