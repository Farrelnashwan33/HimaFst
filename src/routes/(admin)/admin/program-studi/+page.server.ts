import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`SELECT * FROM study_programs ORDER BY id ASC`);
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
		const icon = (data.get('icon') as string)?.trim() || '';

		if (!name) {
			return fail(400, { error: 'Nama Program Studi wajib diisi.' });
		}

		try {
			await db.query(
				`INSERT INTO study_programs (name, description, icon, is_active) VALUES ($1, $2, $3, 1)`,
				[name, description, icon]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'CREATE', 'Program Studi', `Menambahkan program studi: ${name}`]
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
		const icon = (data.get('icon') as string)?.trim() || '';

		if (!id || !name) {
			return fail(400, { error: 'ID dan Nama Program Studi wajib diisi.' });
		}

		try {
			await db.query(
				`UPDATE study_programs SET name = $1, description = $2, icon = $3 WHERE id = $4`,
				[name, description, icon, id]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'UPDATE', 'Program Studi', `Memperbarui program studi ID: ${id}`]
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
			await db.query(`UPDATE study_programs SET is_active = $1 WHERE id = $2`, [nextVal, id]);
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
			await db.query('DELETE FROM study_programs WHERE id = $1', [id]);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'DELETE', 'Program Studi', `Menghapus program studi ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
