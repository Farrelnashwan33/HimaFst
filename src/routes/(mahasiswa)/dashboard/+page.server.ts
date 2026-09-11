import { getDb } from '$lib/server/db';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const db = getDb();
  
  let profile = null;
  let settings: any = {};
  let quickAccess: any[] = [];
  let announcements: any[] = [];
  let events: any[] = [];
  let featuredAchievements: any[] = [];

  // Stats defaults
  let studentCount = 0;
  let programCount = 0;
  let eventCount = 0;
  let achievementCount = 0;

  try {
    // Profile mahasiswa yang login
    if (locals.user && locals.user.role === 'mahasiswa') {
      const [profileRows]: any = await db.query(
        `SELECT * FROM student_profiles WHERE user_id = $1`,
        [locals.user.id]
      );
      if (profileRows.length > 0) {
        profile = profileRows[0];
      }
    }

    // 1. Site Settings for Hero
    try {
      const [settingsRows]: any = await db.query('SELECT setting_key, setting_value FROM site_settings');
      settings = settingsRows.reduce((acc: any, row: any) => {
        acc[row.setting_key] = row.setting_value;
        return acc;
      }, {});
    } catch (e) {}

    // 2. Quick Access
    try {
      const [qaRows]: any = await db.query('SELECT * FROM quick_access WHERE is_active = TRUE ORDER BY sort_order ASC');
      quickAccess = qaRows;
    } catch (e) {}

    // 3. Dynamic Stats (using Prisma for users, raw pg for others)
    studentCount = await prisma.user.count({ where: { role: 'mahasiswa' } });

    try {
      const [pRows]: any = await db.query(`SELECT COUNT(*) as count FROM programs WHERE status = 'published' OR status = 'active'`);
      programCount = Number(pRows[0]?.count ?? 0);
    } catch (e) {}

    try {
      const [eRows]: any = await db.query(`SELECT COUNT(*) as count FROM events WHERE event_date >= CURRENT_DATE AND is_published = TRUE`);
      eventCount = Number(eRows[0]?.count ?? 0);
    } catch (e) {
      // Fallback without is_published filter in case column doesn't exist yet
      try {
        const [eRows2]: any = await db.query(`SELECT COUNT(*) as count FROM events WHERE event_date >= CURRENT_DATE`);
        eventCount = Number(eRows2[0]?.count ?? 0);
      } catch (e2) {}
    }

    try {
      const [aRows]: any = await db.query(`SELECT COUNT(*) as count FROM achievements WHERE is_published = TRUE`);
      achievementCount = Number(aRows[0]?.count ?? 0);
    } catch (e) {
      try {
        const [aRows2]: any = await db.query(`SELECT COUNT(*) as count FROM achievements`);
        achievementCount = Number(aRows2[0]?.count ?? 0);
      } catch (e2) {}
    }

    // 4. Announcements Published, latest 3
    try {
      const [annRows]: any = await db.query(`
        SELECT id, title, content, created_at
        FROM announcements
        WHERE is_published = TRUE
        ORDER BY created_at DESC LIMIT 3
      `);
      announcements = annRows;
    } catch (e) {}

    // 5. Upcoming Events, latest 3
    try {
      const [evRows]: any = await db.query(`
        SELECT id, title, description, event_date, event_time, location, category, status
        FROM events
        WHERE event_date >= CURRENT_DATE AND is_published = TRUE
        ORDER BY event_date ASC LIMIT 3
      `);
      events = evRows;
    } catch (e) {
      // Fallback without is_published filter
      try {
        const [evRows2]: any = await db.query(`
          SELECT id, title, description, event_date, event_time, location, category, status
          FROM events
          WHERE event_date >= CURRENT_DATE
          ORDER BY event_date ASC LIMIT 3
        `);
        events = evRows2;
      } catch (e2) {}
    }

    // 6. Hall of Fame: Featured Achievements (is_featured = TRUE, is_published = TRUE), max 3
    try {
      const [achRows]: any = await db.query(`
        SELECT id, student_name, title, level, image_url, description, award_date
        FROM achievements
        WHERE is_featured = TRUE AND is_published = TRUE
        ORDER BY award_date DESC LIMIT 3
      `);
      featuredAchievements = achRows;
    } catch (e) {
      // Fallback: show latest published achievements
      try {
        const [achRows2]: any = await db.query(`
          SELECT id, student_name, title, level, image_url, description, award_date
          FROM achievements
          WHERE is_published = TRUE
          ORDER BY created_at DESC LIMIT 3
        `);
        featuredAchievements = achRows2;
      } catch (e2) {}
    }

  } catch (error) {
    console.error("Dashboard Server Error:", error);
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
      students: studentCount,
      programs: programCount,
      upcomingEvents: eventCount,
      achievements: achievementCount
    },
    announcements,
    events,
    featuredAchievements
  };
};
