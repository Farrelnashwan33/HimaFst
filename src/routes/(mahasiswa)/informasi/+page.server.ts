import { getDb } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const db = getDb();
  let announcements: any[] = [];

  try {
    const [rows]: any = await db.query(`
      SELECT id, title, content, created_at 
      FROM announcements 
      WHERE is_published = 1 
      ORDER BY created_at DESC, id DESC
    `);
    announcements = rows || [];
  } catch (e) {
    console.error('Error fetching announcements for mahasiswa:', e);
  }

  return {
    announcements
  };
};
