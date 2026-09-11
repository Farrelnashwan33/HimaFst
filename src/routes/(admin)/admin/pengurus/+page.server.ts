import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [officers]: any = await db.query(`SELECT * FROM officers ORDER BY id ASC`);
		const [divisions]: any = await db.query(`SELECT id, name FROM divisions ORDER BY name ASC`);
		return {
			items: officers as any[],
			divisions: divisions as any[]
		};
	} catch (e) {
		console.error(e);
		return { items: [], divisions: [] };
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();
		const name = (data.get('name') as string)?.trim();
		const position = (data.get('position') as string)?.trim();
		const division_name = (data.get('division_name') as string)?.trim() || 'Badan Pengurus Harian';
		const image_url = (data.get('image_url') as string)?.trim() || '/anggota/639728685_17893420674411782_4440245931304648053_n..webp';
		const period = (data.get('period') as string)?.trim() || '2026/2027';

		if (!name || !position) {
			return fail(400, { error: 'Nama dan Jabatan pengurus wajib diisi.' });
		}

		try {
			await db.query(
				`INSERT INTO officers (name, position, division_name, image_url, period, is_active)
				 VALUES ($1, $2, $3, $4, $5, 1)`,
				[name, position, division_name, image_url, period]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'CREATE', 'Pengurus HIMA', `Menambahkan pengurus: ${name} (${position})`]
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
		const position = (data.get('position') as string)?.trim();
		const division_name = (data.get('division_name') as string)?.trim() || 'Badan Pengurus Harian';
		const image_url = (data.get('image_url') as string)?.trim() || '';
		const period = (data.get('period') as string)?.trim() || '2026/2027';

		if (!id || !name || !position) {
			return fail(400, { error: 'ID, Nama, dan Jabatan wajib diisi.' });
		}

		try {
			await db.query(
				`UPDATE officers 
				 SET name = $1, position = $2, division_name = $3, image_url = $4, period = $5 
				 WHERE id = $6`,
				[name, position, division_name, image_url, period, id]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'UPDATE', 'Pengurus HIMA', `Memperbarui pengurus ID: ${id}`]
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
			await db.query(`UPDATE officers SET is_active = $1 WHERE id = $2`, [nextVal, id]);
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
			await db.query('DELETE FROM officers WHERE id = $1', [id]);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'DELETE', 'Pengurus HIMA', `Menghapus pengurus ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
