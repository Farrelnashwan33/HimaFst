import { getDb } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const db = getDb();
  let achievements: any[] = [];

  try {
    const [rows]: any = await db.query(`
      SELECT id, student_name, title, award_name, level, award_date, image_url, description
      FROM achievements
      WHERE is_published = 1
      ORDER BY award_date DESC, id DESC
    `);
    achievements = rows || [];
  } catch (err) {
    console.error('Error fetching achievements:', err);
  }

  // Fallback if empty
  if (achievements.length === 0) {
    achievements = [
      {
        id: 1,
        student_name: 'Lutfi Ardiansyah',
        title: 'Juara 1 Desain Poster Ilmiah',
        award_name: 'DISPORSENI Nasional UT 2026',
        level: 'Nasional',
        award_date: '2026-08-15',
        image_url: '/prestasi/lutfi.png',
        description: 'Mahasiswa S1 Sistem Informasi yang berprestasi mewakili Fakultas Sains dan Teknologi Universitas Terbuka Bandung pada ajang DISPORSENI Nasional UT 2026.'
      },
      {
        id: 2,
        student_name: 'Wasil Mawardi Assul Toni',
        title: 'Juara 2 Debat Ilmiah Sains',
        award_name: 'DISPORSENI Nasional UT 2026',
        level: 'Nasional',
        award_date: '2026-08-16',
        image_url: '/prestasi/wasil.png',
        description: 'Mahasiswa S1 Sistem Informasi yang berprestasi mewakili Fakultas Sains dan Teknologi Universitas Terbuka Bandung pada ajang DISPORSENI Nasional UT 2026.'
      },
      {
        id: 3,
        student_name: 'Alfi Tahar',
        title: 'Juara 1 Data Science Competition',
        award_name: 'DISPORSENI Nasional UT 2026',
        level: 'Nasional',
        award_date: '2026-08-17',
        image_url: '/prestasi/alfi.png',
        description: 'Mahasiswa S1 Sains & Data yang berprestasi mewakili Fakultas Sains dan Teknologi Universitas Terbuka Bandung pada ajang DISPORSENI Nasional UT 2026.'
      }
    ];
  }

  return {
    achievements
  };
};
