import { getDb } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const { fullName, nim, studyProgram, semester, whatsapp, email, division, reason, experience } = data;

		if (!fullName || !nim || !whatsapp || !email) {
			return json({ success: false, message: 'Nama, NIM, WhatsApp, dan Email wajib diisi.' }, { status: 400 });
		}

		const db = getDb();
		await db.query(
			`INSERT INTO membership_registrations (name, nim, email, whatsapp, prodi, semester, division_choice, reason, experience)
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
			[fullName, nim, email, whatsapp, studyProgram, semester, division, reason, experience]
		);

		return json({ success: true, message: 'Pendaftaran berhasil dikirim!' });
	} catch (error: any) {
		console.error('API Pendaftaran Error:', error);
		return json({ success: false, message: 'Gagal memproses pendaftaran: ' + (error.message || 'Unknown error') }, { status: 500 });
	}
};
