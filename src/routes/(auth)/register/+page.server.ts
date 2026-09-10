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
    
    const fullName = data.get('fullName') as string;
    const nim = data.get('nim') as string;
    const email = data.get('email') as string;
    const whatsapp = data.get('whatsapp') as string;
    const programStudi = data.get('programStudi') as string;
    const semester = data.get('semester') as string;
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
      const [emailCheck]: any = await db.query('SELECT id FROM users WHERE email = ?', [email]);
      if (emailCheck.length > 0) {
        return fail(400, { ...values, error: 'Email sudah terdaftar.' });
      }

      // Check for duplicate NIM
      const [nimCheck]: any = await db.query('SELECT id FROM student_profiles WHERE nim = ?', [nim]);
      if (nimCheck.length > 0) {
        return fail(400, { ...values, error: 'NIM sudah terdaftar.' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Begin transaction
      const connection = await db.getConnection();
      try {
        await connection.beginTransaction();

        // Insert user
        const [userResult]: any = await connection.query(
          'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
          [email, hashedPassword, 'mahasiswa']
        );
        const userId = userResult.insertId;

        // Insert profile
        await connection.query(
          `INSERT INTO student_profiles 
           (user_id, full_name, nim, whatsapp, program_studi, semester) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [userId, fullName, nim, whatsapp, programStudi, semester]
        );

        await connection.commit();
        return { success: true };
      } catch (e) {
        await connection.rollback();
        console.error(e);
        return fail(500, { ...values, error: 'Gagal mendaftarkan akun. Coba lagi.' });
      } finally {
        connection.release();
      }

    } catch (e) {
      console.error(e);
      return fail(500, { ...values, error: 'Internal server error' });
    }
  }
};
