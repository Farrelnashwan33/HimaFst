import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { hashPassword } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const db = getDb();
	try {
		const [rows]: any = await db.query('SELECT setting_key, setting_value FROM site_settings');
		const settings = rows.reduce((acc: any, row: any) => {
			acc[row.setting_key] = row.setting_value;
			return acc;
		}, {});

		return {
			settings,
			currentUser: locals.user
		};
	} catch (e) {
		console.error(e);
		return {
			settings: {},
			currentUser: locals.user
		};
	}
};

export const actions: Actions = {
	updateSettings: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();

		try {
			for (const [key, value] of data.entries()) {
				if (key.startsWith('setting_')) {
					const cleanKey = key.replace('setting_', '');
					await db.query(
						'INSERT OR REPLACE INTO site_settings (setting_key, setting_value) VALUES (?, ?)',
						[cleanKey, value.toString()]
					);
				}
			}

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)',
					[locals.user.id, 'UPDATE', 'Settings', 'Memperbarui pengaturan website & kontak']
				);
			}

			return { success: true, message: 'Pengaturan website berhasil disimpan!' };
		} catch (e: any) {
			console.error(e);
			return fail(500, { error: e.message });
		}
	},

	updateProfile: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'Unauthorized' });

		const db = getDb();
		const data = await request.formData();
		const name = (data.get('name') as string)?.trim();
		const email = (data.get('email') as string)?.trim().toLowerCase();
		const password = (data.get('password') as string)?.trim();

		if (!name || !email) {
			return fail(400, { error: 'Nama dan email tidak boleh kosong' });
		}

		try {
			if (password && password.length >= 6) {
				const hashed = await hashPassword(password);
				await db.query(
					'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
					[name, email, hashed, locals.user.id]
				);
			} else {
				await db.query(
					'UPDATE users SET name = ?, email = ? WHERE id = ?',
					[name, email, locals.user.id]
				);
			}

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)',
					[locals.user.id, 'UPDATE', 'Settings', 'Memperbarui profil akun admin']
				);
			}

			return { success: true, message: 'Profil admin berhasil diperbarui!' };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
