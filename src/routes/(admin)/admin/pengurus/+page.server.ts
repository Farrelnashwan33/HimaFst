import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { hashPassword } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [rows] = await db.execute(`SELECT id, name, name as full_name, email, role, created_at FROM users WHERE role = 'admin' ORDER BY created_at DESC`);
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
		const full_name = (data.get('full_name') as string)?.trim();
		const email = (data.get('email') as string)?.trim();
		const role = (data.get('role') as string) || 'admin';

		if (!full_name || !email) {
			return fail(400, { error: 'Nama lengkap dan email wajib diisi' });
		}

		try {
			const defaultPassword = await hashPassword('himafst123');
			await db.execute(
				'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
				[full_name, email, defaultPassword, role]
			);
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'CREATE', 'Pengurus Himpunan', `Admin menambahkan data pengurus: ${full_name}`]);
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
			await db.execute('DELETE FROM users WHERE id = ?', [id]);
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'DELETE', 'Pengurus Himpunan', `Admin menghapus data ID: ${id} dari users`]);
			}
			
			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};

