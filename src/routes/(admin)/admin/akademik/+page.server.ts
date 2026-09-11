import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`SELECT * FROM academic_info ORDER BY id DESC`);
		return { items: rows as any[] };
	} catch (e) {
		console.error(e);
		return { items: [] };
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();
		const title = (data.get('title') as string)?.trim();
		const content = (data.get('content') as string)?.trim();
		const type = (data.get('type') as string)?.trim() || 'Tuton';
		const link_url = (data.get('link_url') as string)?.trim() || '';

		if (!title || !content) {
			return fail(400, { error: 'Judul dan Isi Informasi Akademik wajib diisi.' });
		}

		try {
			await db.query(
				`INSERT INTO academic_info (title, content, type, link_url, is_published) VALUES ($1, $2, $3, $4, 1)`,
				[title, content, type, link_url]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'CREATE', 'Info Akademik', `Menambahkan info akademik: ${title}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			console.error(e);
			return fail(500, { error: e.message });
		}
	},

	update: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();
		const id = data.get('id');
		const title = (data.get('title') as string)?.trim();
		const content = (data.get('content') as string)?.trim();
		const type = (data.get('type') as string)?.trim() || 'Tuton';
		const link_url = (data.get('link_url') as string)?.trim() || '';

		if (!id || !title || !content) {
			return fail(400, { error: 'ID, Judul, dan Isi Informasi wajib diisi.' });
		}

		try {
			await db.query(
				`UPDATE academic_info SET title = $1, content = $2, type = $3, link_url = $4 WHERE id = $5`,
				[title, content, type, link_url, id]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'UPDATE', 'Info Akademik', `Memperbarui info akademik ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	},

	togglePublish: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();
		const id = data.get('id');
		const current = data.get('current') === '1' || data.get('current') === 'true';

		if (!id) return fail(400, { error: 'ID tidak valid' });

		try {
			const nextVal = current ? 0 : 1;
			await db.query(`UPDATE academic_info SET is_published = $1 WHERE id = $2`, [nextVal, id]);
			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	},

	delete: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();
		const id = data.get('id');
		if (!id) return fail(400, { error: 'ID tidak valid' });

		try {
			await db.query('DELETE FROM academic_info WHERE id = $1', [id]);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'DELETE', 'Info Akademik', `Menghapus info akademik ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
