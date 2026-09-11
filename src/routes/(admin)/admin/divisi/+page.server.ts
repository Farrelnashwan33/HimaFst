import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`SELECT * FROM divisions ORDER BY id ASC`);
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
		const name = (data.get('name') as string)?.trim();
		const description = (data.get('description') as string)?.trim();
		const leader = (data.get('leader') as string)?.trim() || '';
		const icon = (data.get('icon') as string)?.trim() || '💼';

		if (!name) {
			return fail(400, { error: 'Nama Divisi wajib diisi.' });
		}

		try {
			await db.query(
				`INSERT INTO divisions (name, description, leader, icon, is_active) VALUES ($1, $2, $3, $4, 1)`,
				[name, description, leader, icon]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'CREATE', 'Divisi HIMA', `Menambahkan divisi: ${name}`]
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
		const name = (data.get('name') as string)?.trim();
		const description = (data.get('description') as string)?.trim();
		const leader = (data.get('leader') as string)?.trim() || '';
		const icon = (data.get('icon') as string)?.trim() || '💼';

		if (!id || !name) {
			return fail(400, { error: 'ID dan Nama Divisi wajib diisi.' });
		}

		try {
			await db.query(
				`UPDATE divisions SET name = $1, description = $2, leader = $3, icon = $4 WHERE id = $5`,
				[name, description, leader, icon, id]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'UPDATE', 'Divisi HIMA', `Memperbarui divisi ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	},

	toggleActive: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();
		const id = data.get('id');
		const current = data.get('current') === '1' || data.get('current') === 'true';

		if (!id) return fail(400, { error: 'ID tidak valid' });

		try {
			const nextVal = current ? 0 : 1;
			await db.query(`UPDATE divisions SET is_active = $1 WHERE id = $2`, [nextVal, id]);
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
			await db.query('DELETE FROM divisions WHERE id = $1', [id]);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'DELETE', 'Divisi HIMA', `Menghapus divisi ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
