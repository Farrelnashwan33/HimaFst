import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user?.role === 'admin') {
    throw redirect(302, '/admin/dashboard');
  } else if (locals.user) {
    throw redirect(302, '/dashboard');
  } else {
    throw redirect(302, '/login');
  }
};
