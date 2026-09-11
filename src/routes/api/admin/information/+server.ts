import { getDb } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`SELECT * FROM announcements ORDER BY created_at DESC`);
		return json({ success: true, data: rows });
	} catch (e: any) {
		return json({ success: false, error: e.message }, { status: 500 });
	}
};
