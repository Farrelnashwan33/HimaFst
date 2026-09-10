import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
const db = getDb();

export const load: PageServerLoad = async () => {
	try {
		const [[studentCount]] = await db.execute('SELECT COUNT(*) as count FROM student_profiles');
		const [[adminCount]] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "admin"');
		const [[eventCount]] = await db.execute('SELECT COUNT(*) as count FROM events');
		const [[announcementCount]] = await db.execute('SELECT COUNT(*) as count FROM announcements');
		
		const [recentLogs] = await db.execute('SELECT * FROM admin_activity_logs ORDER BY created_at DESC LIMIT 5');

		return {
			stats: {
				students: (studentCount as any).count,
				admins: (adminCount as any).count,
				events: (eventCount as any).count,
				announcements: (announcementCount as any).count
			},
			logs: recentLogs as any[]
		};
	} catch (e) {
		console.error(e);
		return { stats: { students: 0, admins: 0, events: 0, announcements: 0 }, logs: [] };
	}
};
