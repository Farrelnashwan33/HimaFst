import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const db = getDb();
	try {
		const [chats]: any = await db.query(`
			SELECT 
				c.id, 
				c.user_id, 
				c.message, 
				c.is_read, 
				c.reply, 
				c.created_at, 
				u.name as user_name, 
				u.email as user_email, 
				sp.nim, 
				sp.program_studi, 
				sp.whatsapp 
			FROM chats c
			LEFT JOIN users u ON c.user_id = u.id
			LEFT JOIN student_profiles sp ON u.id = sp.user_id
			ORDER BY c.created_at DESC
		`);
		return { items: chats as any[] };
	} catch (e) {
		console.error(e);
		return { items: [] };
	}
};

export const actions: Actions = {
	reply: async ({ request, locals }) => {
		const db = getDb();
		const data = await request.formData();
		const id = data.get('id');
		const reply = (data.get('reply') as string)?.trim();

		if (!id || !reply) return fail(400, { error: 'ID dan Pesan balasan wajib diisi' });

		try {
			await db.query(
				`UPDATE chats SET reply = $1, is_read = 1 WHERE id = $2`,
				[reply, id]
			);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'REPLY', 'Chat Admin', `Membalas pesan chat ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	},

	markRead: async ({ request }) => {
		const db = getDb();
		const data = await request.formData();
		const id = data.get('id');

		if (!id) return fail(400, { error: 'ID tidak valid' });

		try {
			await db.query(`UPDATE chats SET is_read = 1 WHERE id = $1`, [id]);
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
			await db.query('DELETE FROM chats WHERE id = $1', [id]);

			if (locals.user?.id) {
				await db.query(
					'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES ($1, $2, $3, $4)',
					[locals.user.id, 'DELETE', 'Chat Admin', `Menghapus chat ID: ${id}`]
				);
			}

			return { success: true };
		} catch (e: any) {
			return fail(500, { error: e.message });
		}
	}
};
