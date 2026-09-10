import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const db = getDb();
	
	try {
		// Fetch chats with user details
		const [rows]: any = await db.query(`
			SELECT 
				c.id, 
				c.message, 
				c.created_at, 
				c.user_id,
				u.name as user_name,
				u.role,
				sp.avatar_url
			FROM chats c
			JOIN users u ON c.user_id = u.id
			LEFT JOIN student_profiles sp ON u.id = sp.user_id
			ORDER BY c.created_at ASC
		`);

		return {
			chats: rows,
			currentUser: locals.user
		};
	} catch (error) {
		console.error('Error loading chats:', error);
		return {
			chats: [],
			currentUser: locals.user
		};
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Anda harus login untuk mengirim pesan' });
		}

		const data = await request.formData();
		const message = data.get('message')?.toString().trim();

		if (!message) {
			return fail(400, { error: 'Pesan tidak boleh kosong' });
		}

		const db = getDb();

		try {
			await db.query(
				'INSERT INTO chats (user_id, message) VALUES (?, ?)',
				[locals.user.id, message]
			);
			return { success: true };
		} catch (error: any) {
			console.error('Error saving chat:', error);
			return fail(500, { error: 'Gagal mengirim pesan: ' + error.message });
		}
	}
};
