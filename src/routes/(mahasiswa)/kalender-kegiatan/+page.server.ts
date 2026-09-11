import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`
			SELECT id, title, description, event_date, event_time, location, category, status 
			FROM events 
			WHERE is_published = 1 
			ORDER BY event_date ASC
		`);
		return { events: rows as any[] };
	} catch (e) {
		console.error('Error loading events:', e);
		return { events: [] };
	}
};
