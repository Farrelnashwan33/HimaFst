import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
const db = getDb();
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const [rows] = await db.execute(`SELECT * FROM programs ORDER BY created_at DESC`);
		return { items: rows as any[] };
	} catch (e) {
		console.error(e);
		return { items: [] };
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();
		const title = data.get('title');
const description = data.get('description');
const status = data.get('status');

		try {
			await db.execute(
				'INSERT INTO programs (title, description, status) VALUES (?, ?, ?)',
				[title, description, status]
			);
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'CREATE', 'Program Kerja', `Admin menambahkan data ke programs`]);
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
			await db.execute('DELETE FROM programs WHERE id = ?', [id]);
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'DELETE', 'Program Kerja', `Admin menghapus data ID: ${id} dari programs`]);
			}
			
			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
