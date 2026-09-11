import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const studentCount = await prisma.studentProfile.count();
		const adminCount = await prisma.user.count({ where: { role: 'admin' } });
		
		const [eventResult]: any = await db.query('SELECT COUNT(*) as count FROM events');
		const eventCount = eventResult[0];
		
		const [announcementResult]: any = await db.query('SELECT COUNT(*) as count FROM announcements');
		const announcementCount = announcementResult[0];
		
		const [recentLogs]: any = await db.query('SELECT * FROM admin_activity_logs ORDER BY created_at DESC LIMIT 5');

		return {
			stats: {
				students: studentCount,
				admins: adminCount,
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
