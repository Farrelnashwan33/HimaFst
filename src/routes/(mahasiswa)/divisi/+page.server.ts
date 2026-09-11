import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`
			SELECT id, name, description, leader, icon 
			FROM divisions 
			WHERE is_active = 1 
			ORDER BY id ASC
		`);
		return { divisions: rows as any[] };
	} catch (e) {
		console.error('Error loading divisions:', e);
		return { divisions: [] };
	}
};
