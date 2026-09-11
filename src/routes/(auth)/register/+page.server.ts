import { fail } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { hashPassword } from '$lib/server/auth';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    
    const fullName = (data.get('fullName') as string)?.trim();
    const nim = (data.get('nim') as string)?.trim();
    const email = (data.get('email') as string)?.trim().toLowerCase();
    const whatsapp = (data.get('whatsapp') as string)?.trim();
    const programStudi = (data.get('programStudi') as string)?.trim();
    const semester = (data.get('semester') as string)?.trim();
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;

    const values = { fullName, nim, email, whatsapp, programStudi, semester };

    if (!fullName || !nim || !email || !whatsapp || !programStudi || !semester || !password || !confirmPassword) {
      return fail(400, { ...values, error: 'Semua kolom wajib diisi.' });
    }

    if (password.length < 8) {
      return fail(400, { ...values, error: 'Password minimal 8 karakter.' });
    }

    if (password !== confirmPassword) {
      return fail(400, { ...values, error: 'Konfirmasi password tidak cocok.' });
    }

    try {
      const db = getDb();

      // Check for duplicate email
      const [existingUsers]: any = await db.query('SELECT id FROM users WHERE LOWER(email) = LOWER(?)', [email]);
      if (existingUsers && existingUsers.length > 0) {
        return fail(400, { ...values, error: 'Email sudah terdaftar.' });
      }

      // Check for duplicate NIM
      const [existingProfiles]: any = await db.query('SELECT id FROM student_profiles WHERE LOWER(nim) = LOWER(?)', [nim]);
      if (existingProfiles && existingProfiles.length > 0) {
        return fail(400, { ...values, error: 'NIM sudah terdaftar.' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Insert user
      const [, meta]: any = await db.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [fullName, email, hashedPassword, 'mahasiswa']
      );

      const userId = meta.insertId;

      // Insert student profile
      await db.execute(
        'INSERT INTO student_profiles (user_id, nim, whatsapp, program_studi, semester) VALUES (?, ?, ?, ?, ?)',
        [userId, nim, whatsapp, programStudi, semester]
      );

      return { success: true };

    } catch (e: any) {
      console.error('REGISTER ERROR:', e.message, e.stack);
      return fail(500, { ...values, error: 'Internal server error: ' + (e.message || 'Unknown error') });
    }
  }
};
