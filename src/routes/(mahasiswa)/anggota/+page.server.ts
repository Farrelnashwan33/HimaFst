import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`
			SELECT id, name, position, division_name, image_url, period 
			FROM officers 
			WHERE is_active = 1 
			ORDER BY id ASC
		`);
		return { members: rows as any[] };
	} catch (e) {
		console.error('Error loading officers:', e);
		return { members: [] };
	}
};
