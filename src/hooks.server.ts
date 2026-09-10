import { validateSession } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get('session_id');

  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
  } else {
    const { session, user } = await validateSession(sessionId);
    
    if (session) {
      event.cookies.set('session_id', session.id, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        expires: session.expiresAt,
        secure: process.env.NODE_ENV === 'production'
      });
    } else {
      event.cookies.delete('session_id', { path: '/' });
    }

    event.locals.user = user;
    event.locals.session = session;
  }

  // Authorization checks based on route
  const pathname = event.url.pathname;
  const isAuthRoute = pathname === '/login' || pathname === '/register' || pathname === '/admin/login';
  
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!event.locals.user) {
      throw redirect(302, '/admin/login');
    }
    if (event.locals.user.role !== 'admin') {
      // If student tries to access admin, send to student dashboard
      throw redirect(302, '/dashboard');
    }
  }

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/informasi') || pathname.startsWith('/kalender') || pathname.startsWith('/prestasi') || pathname.startsWith('/pengurus') || pathname.startsWith('/program-studi') || pathname.startsWith('/divisi') || pathname.startsWith('/akademik') || pathname.startsWith('/aspirasi') || pathname.startsWith('/pendaftaran') || pathname.startsWith('/chat-admin') || pathname.startsWith('/settings')) {
    if (!event.locals.user) {
      throw redirect(302, '/login');
    }
    // Admin should not access mahasiswa routes, redirect to admin dashboard
    if (event.locals.user.role === 'admin') {
      throw redirect(302, '/admin/dashboard');
    }
  }

  if (isAuthRoute && event.locals.user) {
    // If already logged in, redirect to respective dashboard
    if (event.locals.user.role === 'admin') {
      throw redirect(302, '/admin/dashboard');
    } else {
      throw redirect(302, '/dashboard');
    }
  }

  return resolve(event);
};
