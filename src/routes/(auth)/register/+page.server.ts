import { fail } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
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
      // Check for duplicate email
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      if (existingUser) {
        return fail(400, { ...values, error: 'Email sudah terdaftar.' });
      }

      // Check for duplicate NIM
      const existingProfile = await prisma.studentProfile.findFirst({
        where: { nim }
      });
      if (existingProfile) {
        return fail(400, { ...values, error: 'NIM sudah terdaftar.' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Insert user and profile using Prisma nested writes
      await prisma.user.create({
        data: {
          name: fullName,
          email,
          password: hashedPassword,
          role: 'mahasiswa',
          profile: {
            create: {
              nim,
              whatsapp,
              programStudi,
              semester
            }
          }
        }
      });

      return { success: true };


    } catch (e: any) {
      console.error('REGISTER ERROR:', e.message, e.stack);
      return fail(500, { ...values, error: 'Internal server error: ' + (e.message || 'Unknown error') });
    }
  }
};
