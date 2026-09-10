import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
const db = getDb();
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const [rows] = await db.execute(`SELECT * FROM aspirations ORDER BY created_at DESC`);
		return { items: rows as any[] };
	} catch (e) {
		console.error(e);
		return { items: [] };
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();
		const subject = data.get('subject');
const content = data.get('content');
const status = data.get('status');

		try {
			await db.execute(
				'INSERT INTO aspirations (subject, content, status) VALUES (?, ?, ?)',
				[subject, content, status]
			);
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'CREATE', 'Aspirasi Mahasiswa', `Admin menambahkan data ke aspirations`]);
			}
			
			return { success: true };
		} catch (e: any) {
			console.error(e);
			return fail(500, { error: e.message });
		}
	},
	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id');
		if (!id) return fail(400, { error: 'ID tidak valid' });

		try {
			await db.execute('DELETE FROM aspirations WHERE id = ?', [id]);
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'DELETE', 'Aspirasi Mahasiswa', `Admin menghapus data ID: ${id} dari aspirations`]);
			}
			
			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
