import { getDb } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const db = getDb();
  let achievements: any[] = [];

  try {
    const [rows]: any = await db.query(`
      SELECT id, student_name, title, award_name, level, award_date, image_url, description
      FROM achievements
      WHERE is_published = 1
      ORDER BY award_date DESC, id DESC
    `);
    achievements = rows || [];
  } catch (err) {
    console.error('Error fetching achievements:', err);
  }

  return {
    achievements
  };
};
