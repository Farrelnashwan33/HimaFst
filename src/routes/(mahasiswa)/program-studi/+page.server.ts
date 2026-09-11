import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`
			SELECT id, name, description, icon 
			FROM study_programs 
			WHERE is_active = 1 
			ORDER BY id ASC
		`);
		return { programs: rows as any[] };
	} catch (e) {
		console.error('Error loading study programs:', e);
		return { programs: [] };
	}
};
