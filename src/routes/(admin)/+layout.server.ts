import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Server-side Access Control
  if (!locals.user) {
    throw redirect(302, '/admin/login');
  }

  const role = locals.user.role?.toLowerCase();
  if (role !== 'admin' && role !== 'pengurus_hima' && role !== 'super_admin') {
    throw redirect(302, '/dashboard');
  }

  const db = getDb();
  let aspirasiPending = 0;
  let pendaftaranPending = 0;
  let chatUnread = 0;
  let userDetails = null;

  try {
    // Run all count queries in parallel for instant speed
    const [aspRes, regRes, chatRes, uRows]: any = await Promise.all([
      db.query("SELECT COUNT(*) as count FROM aspirations WHERE LOWER(status) = 'pending' OR LOWER(status) = 'baru'"),
      db.query("SELECT COUNT(*) as count FROM membership_registrations WHERE LOWER(status) = 'pending' OR LOWER(status) = 'menunggu'"),
      db.query("SELECT COUNT(*) as count FROM chats WHERE is_read = 0"),
      db.query("SELECT id, name, email, role FROM users WHERE id = ?", [locals.user.id])
    ]);

    aspirasiPending = Number(aspRes[0]?.[0]?.count ?? 0);
    pendaftaranPending = Number(regRes[0]?.[0]?.count ?? 0);
    chatUnread = Number(chatRes[0]?.[0]?.count ?? 0);

    if (uRows && uRows[0] && uRows[0].length > 0) {
      userDetails = uRows[0][0];
    }
  } catch (err) {
    console.error('Admin Layout Load Error:', err);
  }

  return {
    user: userDetails || locals.user,
    counts: {
      aspirasiPending,
      pendaftaranPending,
      chatUnread
    }
  };
};
