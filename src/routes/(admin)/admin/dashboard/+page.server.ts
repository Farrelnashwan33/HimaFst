import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [studentRes]: any = await db.query("SELECT COUNT(*) as count FROM users WHERE role = 'mahasiswa'");
		const studentCount = Number(studentRes[0]?.count ?? 0);

		const [adminRes]: any = await db.query("SELECT COUNT(*) as count FROM users WHERE role = 'admin'");
		const adminCount = Number(adminRes[0]?.count ?? 0);
		
		const [eventResult]: any = await db.query('SELECT COUNT(*) as count FROM events');
		const eventCount = eventResult[0];
		
		const [announcementResult]: any = await db.query('SELECT COUNT(*) as count FROM announcements');
		const announcementCount = announcementResult[0];
		
		const [recentLogs]: any = await db.query('SELECT * FROM admin_activity_logs ORDER BY created_at DESC LIMIT 5');

		return {
			stats: {
				students: studentCount,
				admins: adminCount,
				events: (eventCount as any)?.count ?? 0,
				announcements: (announcementCount as any)?.count ?? 0
			},
			logs: (recentLogs as any[]) ?? []
		};
	} catch (e) {
		console.error(e);
		return { stats: { students: 0, admins: 0, events: 0, announcements: 0 }, logs: [] };
	}
};
