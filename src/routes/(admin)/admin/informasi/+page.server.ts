import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const db = getDb();
  try {
    const [rows]: any = await db.query('SELECT * FROM announcements ORDER BY id DESC');
    return { announcements: rows || [] };
  } catch (e) {
    console.error('Error loading announcements:', e);
    return { announcements: [] };
  }
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const data = await request.formData();
    const title = (data.get('title') as string)?.trim();
    const content = (data.get('content') as string)?.trim();
    const is_published = data.get('is_published') === '1' ? 1 : 0;
    const author_id = locals.user?.id;

    if (!title || !content) return fail(400, { error: 'Judul dan isi informasi wajib diisi.' });

    try {
      const db = getDb();
      await db.execute(
        'INSERT INTO announcements (title, content, author_id, is_published) VALUES (?, ?, ?, ?)',
        [title, content, author_id, is_published]
      );

      if (author_id) {
        await db.execute(
          'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)',
          [author_id, 'CREATE', 'Informasi', `Admin mempublikasikan pengumuman: "${title}"`]
        );
      }

      return { success: true, message: 'Informasi berhasil ditambahkan.' };
    } catch (e: any) {
      console.error(e);
      return fail(500, { error: e.message });
    }
  },

  update: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const title = (data.get('title') as string)?.trim();
    const content = (data.get('content') as string)?.trim();
    const is_published = data.get('is_published') === '1' ? 1 : 0;

    if (!id || !title || !content) return fail(400, { error: 'Semua kolom wajib diisi.' });

    try {
      const db = getDb();
      await db.execute(
        'UPDATE announcements SET title = ?, content = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title, content, is_published, id]
      );

      if (locals.user?.id) {
        await db.execute(
          'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)',
          [locals.user.id, 'UPDATE', 'Informasi', `Admin memperbarui informasi ID: ${id} ("${title}")`]
        );
      }

      return { success: true, message: 'Informasi berhasil diperbarui.' };
    } catch (e: any) {
      return fail(500, { error: e.message });
    }
  },

  toggle: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const current = Number(data.get('current'));
    const nextStatus = current === 1 ? 0 : 1;

    try {
      const db = getDb();
      await db.execute('UPDATE announcements SET is_published = ? WHERE id = ?', [nextStatus, id]);

      if (locals.user?.id) {
        await db.execute(
          'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)',
          [locals.user.id, 'UPDATE', 'Informasi', `Admin mengubah status publish informasi ID: ${id}`]
        );
      }

      return { success: true, message: 'Status publikasi informasi berhasil diubah.' };
    } catch (e: any) {
      return fail(500, { error: e.message });
    }
  },

  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    if (!id) return fail(400, { error: 'ID tidak valid' });

    try {
      const db = getDb();
      await db.execute('DELETE FROM announcements WHERE id = ?', [id]);

      if (locals.user?.id) {
        await db.execute(
          'INSERT INTO admin_activity_logs (admin_id, action, module, description) VALUES (?, ?, ?, ?)',
          [locals.user.id, 'DELETE', 'Informasi', `Admin menghapus informasi ID: ${id}`]
        );
      }

      return { success: true, message: 'Informasi berhasil dihapus.' };
    } catch (e: any) {
      return fail(500, { error: e.message });
    }
  }
};
