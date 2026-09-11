import { getDb } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		return json({ success: false, message: 'Unauthorized' }, { status: 401 });
	}

	const db = getDb();
	try {
		const [students]: any = await db.query(`
			SELECT 
				u.id as user_id, 
				u.name, 
				u.email, 
				u.role, 
				u.created_at, 
				sp.nim, 
				sp.program_studi, 
				sp.whatsapp, 
				sp.semester 
			FROM users u 
			LEFT JOIN student_profiles sp ON u.id = sp.user_id 
			WHERE u.role = 'mahasiswa' 
			ORDER BY u.id DESC
		`);
		return json({ success: true, data: students });
	} catch (e: any) {
		return json({ success: false, error: e.message }, { status: 500 });
	}
};
