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
    // Live counts for sidebar badges
    const [aspRes]: any = await db.query(
      "SELECT COUNT(*) as count FROM aspirations WHERE LOWER(status) = 'pending' OR LOWER(status) = 'baru'"
    );
    aspirasiPending = Number(aspRes[0]?.count ?? 0);

    const [regRes]: any = await db.query(
      "SELECT COUNT(*) as count FROM membership_registrations WHERE LOWER(status) = 'pending' OR LOWER(status) = 'menunggu'"
    );
    pendaftaranPending = Number(regRes[0]?.count ?? 0);

    const [chatRes]: any = await db.query("SELECT COUNT(*) as count FROM chats WHERE is_read = 0");
    chatUnread = Number(chatRes[0]?.count ?? 0);

    const [uRows]: any = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [
      locals.user.id
    ]);
    if (uRows && uRows.length > 0) {
      userDetails = uRows[0];
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
