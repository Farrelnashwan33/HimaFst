import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [programs]: any = await db.query(`SELECT * FROM programs ORDER BY id DESC`);
		const [divisions]: any = await db.query(`SELECT id, name FROM divisions ORDER BY name ASC`);
		return {
			items: programs as any[],
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
		const title = (data.get('title') as string)?.trim();
		const division_name = (data.get('division_name') as string)?.trim() || 'HIMA FST';
		const description = (data.get('description') as string)?.trim() || '';
		const objective = (data.get('objective') as string)?.trim() || '';
		const program_date = (data.get('program_date') as string)?.trim() || null;
		const location = (data.get('location') as string)?.trim() || 'Online / Kampus UT';
		const person_in_charge = (data.get('person_in_charge') as string)?.trim() || '';
		const status = (data.get('status') as string)?.trim() || 'Rencana';

		if (!title) {
			return fail(400, { error: 'Nama Program Kerja wajib diisi.' });
		}

		try {
			await db.query(
				`INSERT INTO programs (title, division_name, description, objective, program_date, location, person_in_charge, status) 
				 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
				[title, division_name, description, objective, program_date, location, person_in_charge, status]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'CREATE', 'Program Kerja', `Menambahkan program kerja: ${title}`]
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
		const division_name = (data.get('division_name') as string)?.trim() || 'HIMA FST';
		const description = (data.get('description') as string)?.trim() || '';
		const objective = (data.get('objective') as string)?.trim() || '';
		const program_date = (data.get('program_date') as string)?.trim() || null;
		const location = (data.get('location') as string)?.trim() || '';
		const person_in_charge = (data.get('person_in_charge') as string)?.trim() || '';
		const status = (data.get('status') as string)?.trim() || 'Rencana';

		if (!id || !title) {
			return fail(400, { error: 'ID dan Nama Program Kerja wajib diisi.' });
		}

		try {
			await db.query(
				`UPDATE programs 
				 SET title = $1, division_name = $2, description = $3, objective = $4, program_date = $5, location = $6, person_in_charge = $7, status = $8 
				 WHERE id = $9`,
				[title, division_name, description, objective, program_date, location, person_in_charge, status, id]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'UPDATE', 'Program Kerja', `Memperbarui program kerja ID: ${id}`]
				);
			}

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
			await db.query('DELETE FROM programs WHERE id = $1', [id]);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'DELETE', 'Program Kerja', `Menghapus program kerja ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
