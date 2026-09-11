import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  const db = getDb();

  try {
    // 1. Live Stats Counts
    const [mhsRes]: any = await db.query("SELECT COUNT(*) as count FROM users WHERE role = 'mahasiswa'");
    const studentCount = Number(mhsRes[0]?.count ?? 0);

    const [pengurusRes]: any = await db.query('SELECT COUNT(*) as count FROM officers');
    const officerCount = Number(pengurusRes[0]?.count ?? 0);

    const [prodiRes]: any = await db.query('SELECT COUNT(*) as count FROM study_programs');
    const prodiCount = Number(prodiRes[0]?.count ?? 0);

    const [prestasiRes]: any = await db.query('SELECT COUNT(*) as count FROM achievements');
    const achievementCount = Number(prestasiRes[0]?.count ?? 0);

    const [infoRes]: any = await db.query('SELECT COUNT(*) as count FROM announcements');
    const announcementCount = Number(infoRes[0]?.count ?? 0);

    const [eventRes]: any = await db.query("SELECT COUNT(*) as count FROM events WHERE event_date >= date('now')");
    const eventCount = Number(eventRes[0]?.count ?? 0);

    const [aspRes]: any = await db.query("SELECT COUNT(*) as count FROM aspirations WHERE LOWER(status) = 'pending' OR LOWER(status) = 'baru'");
    const aspirasiPendingCount = Number(aspRes[0]?.count ?? 0);

    const [regRes]: any = await db.query("SELECT COUNT(*) as count FROM membership_registrations WHERE LOWER(status) = 'pending' OR LOWER(status) = 'menunggu'");
    const registrationPendingCount = Number(regRes[0]?.count ?? 0);

    // 2. Recent Students (Latest 5)
    const [recentStudents]: any = await db.query(`
      SELECT u.id, u.name, u.email, u.created_at, sp.nim, sp.program_studi 
      FROM users u 
      LEFT JOIN student_profiles sp ON u.id = sp.user_id 
      WHERE u.role = 'mahasiswa' 
      ORDER BY u.id DESC 
      LIMIT 5
    `);

    // 3. Recent Registrations (Latest 5)
    const [recentRegistrations]: any = await db.query(`
      SELECT id, name, nim, email, prodi, division_choice, status, created_at 
      FROM membership_registrations 
      ORDER BY id DESC 
      LIMIT 5
    `);

    // 4. Recent Aspirations (Latest 5)
    const [recentAspirations]: any = await db.query(`
      SELECT id, subject, content, status, created_at 
      FROM aspirations 
      ORDER BY id DESC 
      LIMIT 5
    `);

    // 5. Recent Admin Activity Logs
    const [recentLogs]: any = await db.query(`
      SELECT * FROM admin_activity_logs 
      ORDER BY created_at DESC 
      LIMIT 6
    `);

    return {
      stats: {
        students: studentCount,
        officers: officerCount,
        studyPrograms: prodiCount,
        achievements: achievementCount,
        announcements: announcementCount,
        upcomingEvents: eventCount,
        aspirasiPending: aspirasiPendingCount,
        registrationsPending: registrationPendingCount
      },
      recentStudents: recentStudents || [],
      recentRegistrations: recentRegistrations || [],
      recentAspirations: recentAspirations || [],
      logs: recentLogs || [],
      user: locals.user
    };
  } catch (e) {
    console.error('Admin Dashboard Load Error:', e);
    return {
      stats: {
        students: 0,
        officers: 0,
        studyPrograms: 0,
        achievements: 0,
        announcements: 0,
        upcomingEvents: 0,
        aspirasiPending: 0,
        registrationsPending: 0
      },
      recentStudents: [],
      recentRegistrations: [],
      recentAspirations: [],
      logs: [],
      user: locals.user
    };
  }
};
