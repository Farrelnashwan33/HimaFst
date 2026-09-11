import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows]: any = await db.query(`SELECT * FROM achievements ORDER BY created_at DESC`);
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
		const student_name = data.get('student_name') as string;
		const title = data.get('title') as string;
		const level = data.get('level') as string;
		const award_date = data.get('award_date') as string || null;
		const description = data.get('description') as string || null;

		if (!student_name || !title) {
			return fail(400, { error: 'Nama mahasiswa dan nama prestasi wajib diisi.' });
		}

		try {
			await db.query(
				`INSERT INTO achievements (student_name, title, level, award_date, description, is_published, is_featured)
				 VALUES ($1, $2, $3, $4, $5, FALSE, FALSE)`,
				[student_name, title, level, award_date, description]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'CREATE', 'Prestasi Mahasiswa', `Admin menambahkan prestasi: ${title}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			console.error(e);
			return fail(500, { error: e.message });
		}
	},

	delete: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();
		const id = data.get('id');
		if (!id) return fail(400, { error: 'ID tidak valid' });

		try {
			await db.query('DELETE FROM achievements WHERE id = $1', [id]);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'DELETE', 'Prestasi Mahasiswa', `Admin menghapus prestasi ID: ${id}`]
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
		const current = data.get('current') === 'true';
		if (!id) return fail(400, { error: 'ID tidak valid' });

		try {
			await db.query('UPDATE achievements SET is_published = $1 WHERE id = $2', [!current, id]);
			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	},

	toggleFeatured: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();
		const id = data.get('id');
		const current = data.get('current') === 'true';
		if (!id) return fail(400, { error: 'ID tidak valid' });

		try {
			await db.query('UPDATE achievements SET is_featured = $1 WHERE id = $2', [!current, id]);
			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
