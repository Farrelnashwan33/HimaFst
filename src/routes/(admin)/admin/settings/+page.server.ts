import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
const db = getDb();
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const [rows]: any = await db.execute('SELECT setting_key, setting_value FROM site_settings');
		const settings = rows.reduce((acc: any, row: any) => {
			acc[row.setting_key] = row.setting_value;
			return acc;
		}, {});
		return { settings };
	} catch (e) {
		console.error(e);
		return { settings: {} };
	}
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		const data = await request.formData();
		
		try {
			for (const [key, value] of data.entries()) {
				await db.execute(
					'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)',
					[key, value]
				);
			}
			
			if (locals.user?.id) {
			  await db.execute('INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)', [locals.user.id, 'UPDATE', 'Settings', `Admin mengupdate konfigurasi website`]);
			}
			
			return { success: true };
		} catch (e: any) {
			console.error(e);
			return fail(500, { error: e.message });
		}
	}
};
