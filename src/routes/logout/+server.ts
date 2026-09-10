import { redirect } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, locals }) => {
  const sessionId = cookies.get('session_id');
  
  if (sessionId) {
    await invalidateSession(sessionId);
    cookies.delete('session_id', { path: '/' });
  }

  const role = locals.user?.role;
  locals.user = null;
  locals.session = null;

  if (role === 'admin') {
    throw redirect(302, '/admin/login');
  }
  
  throw redirect(302, '/login');
};
