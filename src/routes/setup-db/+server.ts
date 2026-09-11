import { getDb } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    const db = getDb();
    // Running a quick count to verify and trigger ensureTables
    const [userRes]: any = await db.query('SELECT COUNT(*) as count FROM users');
    const count = userRes[0]?.count ?? 0;
    
    return json({
      success: true,
      message: 'Turso / SQLite Database initialized and connected!',
      usersCount: count
    });
  } catch (error: any) {
    console.error('Setup DB Error:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
