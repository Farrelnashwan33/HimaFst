import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`SELECT * FROM events ORDER BY event_date ASC, id DESC`);
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
		const title = data.get('title') as string;
		const description = data.get('description') as string || '';
		const event_date = data.get('event_date') as string;
		const event_time = data.get('event_time') as string || '09:00 WIB';
		const location = data.get('location') as string || 'Online';
		const category = data.get('category') as string || 'Kegiatan';
		const status = data.get('status') as string || 'Mendatang';
		const is_published = data.get('is_published') === 'true' || data.get('is_published') === '1' ? 1 : 0;

		if (!title || !event_date) {
			return fail(400, { error: 'Judul dan Tanggal Kegiatan wajib diisi.' });
		}

		try {
			await db.query(
				`INSERT INTO events (title, description, event_date, event_time, location, category, status, is_published) 
				 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
				[title, description, event_date, event_time, location, category, status, is_published]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'CREATE', 'Kalender Kegiatan', `Menambahkan kegiatan: ${title}`]
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
		const title = data.get('title') as string;
		const description = data.get('description') as string || '';
		const event_date = data.get('event_date') as string;
		const event_time = data.get('event_time') as string || '09:00 WIB';
		const location = data.get('location') as string || 'Online';
		const category = data.get('category') as string || 'Kegiatan';
		const status = data.get('status') as string || 'Mendatang';

		if (!id || !title || !event_date) {
			return fail(400, { error: 'ID, Judul, dan Tanggal Kegiatan wajib diisi.' });
		}

		try {
			await db.query(
				`UPDATE events SET title = $1, description = $2, event_date = $3, event_time = $4, location = $5, category = $6, status = $7 WHERE id = $8`,
				[title, description, event_date, event_time, location, category, status, id]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'UPDATE', 'Kalender Kegiatan', `Memperbarui kegiatan ID: ${id}`]
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
			await db.query(`UPDATE events SET is_published = $1 WHERE id = $2`, [nextVal, id]);
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
			await db.query('DELETE FROM events WHERE id = $1', [id]);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'DELETE', 'Kalender Kegiatan', `Menghapus kegiatan ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
