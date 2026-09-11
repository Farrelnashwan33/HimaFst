import { getDb } from '$lib/server/db';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const db = getDb();
  
  let profile = null;
  let settings: any = {};
  let quickAccess: any[] = [];
  let studentCount = [{count: 0}];
  let programCount = [{count: 0}];
  let eventCount = [{count: 0}];
  let achieveCount = [{count: 0}];
  let announcements: any[] = [];
  let events: any[] = [];
  let achievements: any[] = [];

  try {
    if (locals.user && locals.user.role === 'mahasiswa') {
      const [profileRows]: any = await db.query(
        `SELECT sp.*, sp.program_studi as prodi_name 
         FROM student_profiles sp 
         WHERE sp.user_id = ?`,
        [locals.user.id]
      );
      if (profileRows.length > 0) {
        profile = profileRows[0];
      }
    }

    // 1. Fetch Site Settings for Hero
    const [settingsRows]: any = await db.query('SELECT setting_key, setting_value FROM site_settings');
    settings = settingsRows.reduce((acc: any, row: any) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});

    // 2. Fetch Quick Access
    const [qaRows]: any = await db.query('SELECT * FROM quick_access WHERE is_active = TRUE ORDER BY sort_order ASC');
    quickAccess = qaRows;

    // 3. Fetch Dynamic Stats
    const totalMahasiswa = await prisma.user.count({
      where: { role: 'mahasiswa' }
    });
    studentCount = [{ count: totalMahasiswa }];

    try {
      const [pCount]: any = await db.query('SELECT COUNT(*) as count FROM programs');
      programCount = pCount;
    } catch (e) {}

    try {
      const [eCount]: any = await db.query('SELECT COUNT(*) as count FROM events WHERE event_date >= CURRENT_DATE');
      eventCount = eCount;
    } catch (e) {}

    try {
      const [aCount]: any = await db.query('SELECT COUNT(*) as count FROM achievements');
      achieveCount = aCount;
    } catch (e) {}

    // 4. Fetch Announcements (Published, latest 3)
    // const [annRows]: any = await db.query(`
    //   SELECT a.*, u.email as author_email 
    //   FROM announcements a 
    //   LEFT JOIN users u ON a.author_id = u.id 
    //   WHERE a.is_published = TRUE 
    //   ORDER BY a.created_at DESC LIMIT 3
    // `);
    // announcements = annRows;

    // 5. Fetch Upcoming Events (latest 3)
    // const [evRows]: any = await db.query(`
    //   SELECT * FROM events 
    //   WHERE event_date >= CURDATE() 
    //   ORDER BY event_date ASC LIMIT 3
    // `);
    // events = evRows;

    // 6. Fetch Hall of Fame (Achievements, latest 4)
    const [achRows]: any = await db.query('SELECT * FROM achievements ORDER BY award_date DESC LIMIT 4');
    achievements = achRows;

  } catch (error) {
    console.error("Dashboard Server Error:", error);
    // Fallback safe values are already initialized above
  }

  return {
    profile,
    hero: {
      badge: settings.hero_badge || 'PORTAL MAHASISWA',
      title: settings.hero_title || 'Welcome to Portal Fakultas Sains dan Teknologi 👋',
      subtitle: settings.hero_subtitle || 'Ruang informasi, aspirasi, kegiatan, dan kolaborasi mahasiswa Fakultas Sains dan Teknologi.'
    },
    quickAccess,
    stats: {
      students: studentCount[0]?.count || 0,
      programs: programCount[0]?.count || 0,
      upcomingEvents: eventCount[0]?.count || 0,
      achievements: achieveCount[0]?.count || 0
    },
    announcements,
    events,
    achievements
  };
};
