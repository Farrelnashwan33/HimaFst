import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
const db = getDb();
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const [rows] = await db.execute('SELECT * FROM quick_access ORDER BY sort_order ASC');
		return { items: rows as any[] };
	} catch (e) {
		console.error(e);
		return { items: [] };
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const url = data.get('url') as string;
		const is_active = data.get('is_active') === 'true' ? 1 : 0;
		const sort_order = parseInt(data.get('sort_order') as string) || 0;

		if (!name || !url) return fail(400, { error: 'Nama dan URL wajib diisi.' });

		try {
			await db.execute(
				'INSERT INTO quick_access (name, description, url, is_active, sort_order) VALUES (?, ?, ?, ?, ?)',
				[name, description, url, is_active, sort_order]
			);
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'CREATE', 'Quick Access', `Menambahkan tautan: ${name}`]);
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
			await db.execute('DELETE FROM quick_access WHERE id = ?', [id]);
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'DELETE', 'Quick Access', `Menghapus tautan ID: ${id}`]);
			}
			
			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
