import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const url =
  process.env.TURSO_DATABASE_URL ||
  (process.env.DATABASE_URL?.startsWith('libsql:') || process.env.DATABASE_URL?.startsWith('https:') ? process.env.DATABASE_URL : null) ||
  'file:local.db';

const authToken = process.env.TURSO_AUTH_TOKEN || undefined;

console.log(`Connecting to database at ${url}...`);
const c = createClient({ url, authToken });

async function init() {
  try {
    await c.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'mahasiswa',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS student_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL UNIQUE,
        nim TEXT,
        program_studi TEXT,
        whatsapp TEXT,
        semester TEXT,
        avatar_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS admin_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL UNIQUE,
        position TEXT,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author_id INTEGER,
        is_published INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        event_date TEXT NOT NULL,
        event_time TEXT,
        location TEXT,
        category TEXT,
        status TEXT DEFAULT 'Mendatang',
        is_published INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_name TEXT NOT NULL,
        title TEXT,
        award_name TEXT,
        level TEXT,
        award_date TEXT,
        image_url TEXT,
        description TEXT,
        is_published INTEGER DEFAULT 1,
        is_featured INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS quick_access (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        icon TEXT,
        sort_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        setting_key TEXT NOT NULL UNIQUE,
        setting_value TEXT
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS officers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        division_id INTEGER,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS divisions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'published',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS admin_activity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_id INTEGER,
        action TEXT NOT NULL,
        module TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS chats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS academic_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT DEFAULT 'Umum',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS membership_registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        nim TEXT NOT NULL,
        email TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        prodi TEXT,
        semester TEXT,
        division_choice TEXT,
        reason TEXT,
        experience TEXT,
        status TEXT DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS study_programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS aspirations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT,
        content TEXT,
        status TEXT DEFAULT 'Pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if initial users exist
    const userCheck = await c.execute('SELECT COUNT(*) as count FROM users');
    const count = Number(userCheck.rows[0]?.count ?? 0);

    if (count === 0) {
      console.log('⚡ Seeding initial data...');
      const adminPass = await bcrypt.hash('admin123', 10);
      const studentPass = await bcrypt.hash('mahasiswa123', 10);

      // Seed super admin
      await c.execute({
        sql: 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        args: ['Super Admin HIMA', 'superadmin@himafst.org', adminPass, 'admin']
      });

      // Seed admin
      await c.execute({
        sql: 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        args: ['Pengurus HIMA FST', 'admin@himafst.org', adminPass, 'admin']
      });

      // Seed mahasiswa
      const resMahasiswa = await c.execute({
        sql: 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        args: ['Farrel Mahasiswa', 'mahasiswa@ecampus.ut.ac.id', studentPass, 'mahasiswa']
      });

      const mId = Number(resMahasiswa.lastInsertRowid);
      if (mId) {
        await c.execute({
          sql: 'INSERT INTO student_profiles (user_id, nim, program_studi, whatsapp, semester) VALUES (?, ?, ?, ?, ?)',
          args: [mId, '043123456', 'Sistem Informasi', '081234567890', '4']
        });
      }

      // Seed Site Settings
      const settings = [
        ['hero_badge', 'PORTAL MAHASISWA'],
        ['hero_title', 'Welcome to Portal Fakultas Sains dan Teknologi 👋'],
        ['hero_subtitle', 'Ruang informasi, aspirasi, kegiatan, dan kolaborasi mahasiswa Fakultas Sains dan Teknologi UT Bandung.'],
        ['org_name', 'HIMA FST UT Bandung'],
        ['faculty_name', 'Fakultas Sains dan Teknologi'],
        ['contact_email', 'himafst@ut.ac.id'],
        ['whatsapp_admin', '081234567890'],
        ['instagram_link', 'https://instagram.com/himafst_ut']
      ];

      for (const [k, v] of settings) {
        await c.execute({
          sql: 'INSERT OR REPLACE INTO site_settings (setting_key, setting_value) VALUES (?, ?)',
          args: [k, v]
        });
      }

      // Seed Study Programs
      const prodis = [
        ['Sistem Informasi', 'Program studi yang mempelajari perancangan dan penerapan sistem informasi bisnis & teknologi.'],
        ['Teknologi Pangan', 'Program studi yang fokus pada pengolahan, pengawetan, dan keamanan pangan.'],
        ['Biologi', 'Program studi ilmu hayati dan bioteknologi terapan.'],
        ['Matematika', 'Program studi matematika murni dan komputasi sains data.'],
        ['Statistika', 'Program studi pengolahan data statistik dan analitika modern.'],
        ['Perencanaan Wilayah dan Kota (PWK)', 'Program studi tata ruang dan perencanaan kota berkelanjutan.']
      ];

      for (const [name, desc] of prodis) {
        await c.execute({
          sql: 'INSERT INTO study_programs (name, description) VALUES (?, ?)',
          args: [name, desc]
        });
      }

      // Seed Quick Access
      const quickLinks = [
        ['SIA UT', 'https://sia.ut.ac.id', 'Globe', 1],
        ['E-Learning (Tuton)', 'https://elearning.ut.ac.id', 'BookOpen', 2],
        ['Perpustakaan Digital', 'https://pustaka.ut.ac.id', 'Library', 3],
        ['Aspirasi Mahasiswa', '/aspirasi', 'MessageSquare', 4]
      ];

      for (const [name, url, icon, sort] of quickLinks) {
        await c.execute({
          sql: 'INSERT INTO quick_access (name, url, icon, sort_order) VALUES (?, ?, ?, ?)',
          args: [name, url, icon, sort]
        });
      }

      // Seed Sample Announcements
      await c.execute({
        sql: 'INSERT INTO announcements (title, content, is_published) VALUES (?, ?, 1)',
        args: [
          'Pendaftaran Pengurus HIMA FST Periode 2026/2027 Dibuka!',
          'Kami membuka kesempatan bagi seluruh mahasiswa aktif FST untuk bergabung menjadi bagian dari kepengurusan HIMA FST. Silakan daftar melalui menu Gabung HIMA.'
        ]
      });

      console.log('✅ Default seed data inserted successfully!');
    } else {
      console.log(`Database already has ${count} users.`);
    }

    console.log('🎉 Database initialization complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error initializing database:', err);
    process.exit(1);
  }
}

init();
