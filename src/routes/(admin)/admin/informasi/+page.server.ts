import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
const db = getDb();
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const [rows] = await db.execute('SELECT * FROM announcements ORDER BY created_at DESC');
		return { announcements: rows as any[] };
	} catch (e) {
		console.error(e);
		return { announcements: [] };
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const content = data.get('content') as string;
		const is_published = data.get('is_published') === 'true' ? 1 : 0;
		const author_id = locals.user?.id;

		if (!title || !content) return fail(400, { error: 'Judul dan isi wajib diisi.' });

		try {
			await db.execute(
				'INSERT INTO announcements (title, content, author_id, is_published) VALUES (?, ?, ?, ?)',
				[title, content, author_id, is_published]
			);
			
			// Audit Log
			if (author_id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [author_id, 'CREATE', 'Informasi', `Admin menambahkan informasi: ${title}`]);
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
			await db.execute('DELETE FROM announcements WHERE id = ?', [id]);
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'DELETE', 'Informasi', `Admin menghapus informasi ID: ${id}`]);
			}
			
			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
