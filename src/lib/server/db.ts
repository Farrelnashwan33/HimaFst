import { createClient, type Client } from '@libsql/client';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import bcrypt from 'bcryptjs';

let client: Client | null = null;
let isInitialized = false;
let ensurePromise: Promise<void> | null = null;

function getClient(): Client {
  if (client) return client;

  const isServerless =
    process.env.VERCEL === '1' ||
    Boolean(process.env.VERCEL) ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
    process.env.NODE_ENV === 'production';

  const fallbackUrl = isServerless ? 'file:/tmp/local.db' : 'file:local.db';

  const url =
    env.TURSO_DATABASE_URL ||
    process.env.TURSO_DATABASE_URL ||
    env.TURSO_URL ||
    process.env.TURSO_URL ||
    env.LIBSQL_URL ||
    process.env.LIBSQL_URL ||
    (env.DATABASE_URL?.startsWith('libsql:') || env.DATABASE_URL?.startsWith('https:') ? env.DATABASE_URL : null) ||
    (process.env.DATABASE_URL?.startsWith('libsql:') || process.env.DATABASE_URL?.startsWith('https:') ? process.env.DATABASE_URL : null) ||
    fallbackUrl;

  const authToken =
    env.TURSO_AUTH_TOKEN ||
    process.env.TURSO_AUTH_TOKEN ||
    env.LIBSQL_AUTH_TOKEN ||
    process.env.LIBSQL_AUTH_TOKEN ||
    env.TURSO_TOKEN ||
    process.env.TURSO_TOKEN ||
    undefined;

  console.log(`[DB] Connecting to database: ${url.startsWith('file:') ? url : url.replace(/\/\/.*@/, '//***@')}`);

  client = createClient({
    url,
    authToken
  });

  return client;
}

// Ensure database tables exist and seed initial data
async function ensureTables(c: Client): Promise<void> {
  if (isInitialized || building) return;
  if (!ensurePromise) {
    ensurePromise = (async () => {
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
        division_name TEXT,
        image_url TEXT,
        period TEXT DEFAULT '2026/2027',
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS divisions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        leader TEXT,
        icon TEXT,
        is_active INTEGER DEFAULT 1,
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
        is_read INTEGER DEFAULT 0,
        reply TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS academic_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT DEFAULT 'Umum',
        link_url TEXT,
        is_published INTEGER DEFAULT 1,
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
        status TEXT DEFAULT 'MENUNGGU',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS study_programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await c.execute(`
      CREATE TABLE IF NOT EXISTS aspirations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT,
        nim TEXT,
        subject TEXT,
        content TEXT,
        reply TEXT,
        status TEXT DEFAULT 'BARU',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Safe column migrations in case tables were created with older versions
    const tryAddColumn = async (table: string, colDef: string) => {
      try {
        await c.execute(`ALTER TABLE ${table} ADD COLUMN ${colDef}`);
      } catch (ignored) {}
    };

    await tryAddColumn('aspirations', 'user_id INTEGER');
    await tryAddColumn('aspirations', 'name TEXT');
    await tryAddColumn('aspirations', 'nim TEXT');
    await tryAddColumn('aspirations', 'reply TEXT');
    await tryAddColumn('events', 'event_time TEXT');
    await tryAddColumn('events', 'category TEXT');
    await tryAddColumn('events', 'status TEXT DEFAULT "Mendatang"');
    await tryAddColumn('events', 'is_published INTEGER DEFAULT 1');
    await tryAddColumn('officers', 'division_name TEXT');
    await tryAddColumn('officers', 'period TEXT DEFAULT "2026/2027"');
    await tryAddColumn('officers', 'is_active INTEGER DEFAULT 1');
    await tryAddColumn('divisions', 'leader TEXT');
    await tryAddColumn('divisions', 'icon TEXT');
    await tryAddColumn('divisions', 'is_active INTEGER DEFAULT 1');
    await tryAddColumn('academic_info', 'link_url TEXT');
    await tryAddColumn('academic_info', 'is_published INTEGER DEFAULT 1');
    await tryAddColumn('study_programs', 'icon TEXT');
    await tryAddColumn('study_programs', 'is_active INTEGER DEFAULT 1');
    await tryAddColumn('chats', 'is_read INTEGER DEFAULT 0');
    await tryAddColumn('chats', 'reply TEXT');
    await tryAddColumn('programs', 'division_name TEXT');
    await tryAddColumn('programs', 'objective TEXT');
    await tryAddColumn('programs', 'program_date TEXT');
    await tryAddColumn('programs', 'location TEXT');
    await tryAddColumn('programs', 'person_in_charge TEXT');

    // Check if initial database setup is needed
    const userCheck = await c.execute('SELECT COUNT(*) as count FROM users');
    const count = Number(userCheck.rows[0]?.count ?? 0);

    if (count === 0) {
      console.log('⚡ Initializing default seed data for Turso / SQLite (one-time setup)...');
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
        ['instagram_link', 'https://instagram.com/himafst_ut'],
        ['system_initialized', '1']
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

      // Seed divisions (one-time)
      const defaultDivisions = [
        ['Badan Pengurus Harian', 'Pimpinan dan koordinator utama jalannya organisasi HIMA FST.', 'Tasya Angelicia', '👑'],
        ['Bendahara', 'Pengelolaan keuangan dan administrasi pendanaan organisasi.', 'Ima Siti Fatimah', '💰'],
        ['Sekretaris', 'Pengelolaan administrasi kesekretariatan dan tata usaha.', 'Fithrotul Kamilah Zakiah', '📝'],
        ['Hubungan Masyarakat', 'Hubungan eksternal, kerjasama antar lembaga, dan jaringan kemahasiswaan.', 'Kurnia Rahayu', '📢'],
        ['Pengembangan Sumber Daya Mahasiswa', 'Pemberdayaan dan pelatihan potensi mahasiswa FST.', 'Annadzira Sukma Kamila', '🎓'],
        ['Media Informasi & Teknologi', 'Pengembangan teknologi informasi, desain kreatif, dan media sosial.', 'Keisha Refanaura Hakim', '💻']
      ];
      for (const [name, desc, leader, icon] of defaultDivisions) {
        await c.execute({
          sql: 'INSERT INTO divisions (name, description, leader, icon) VALUES (?, ?, ?, ?)',
          args: [name, desc, leader, icon]
        });
      }

      // Seed officers (one-time)
      const defaultOfficers = [
        ['Tasya Angelicia', 'Ketua Himpunan', 'Badan Pengurus Harian', '/anggota/639728685_17893420674411782_4440245931304648053_n..webp'],
        ['Eka Septi Narsiati', 'Wakil Ketua Himpunan', 'Badan Pengurus Harian', '/anggota/636970169_17893418355411782_8654938015269718382_n..webp'],
        ['Ima Siti Fatimah', 'Bendahara 1', 'Bendahara', '/anggota/636204297_17893415589411782_6604859214681852774_n..webp'],
        ['Karima Khoerunnisa', 'Bendahara 2', 'Bendahara', '/anggota/636730634_17893414491411782_5949510265058959597_n..webp'],
        ['Fithrotul Kamilah Zakiah', 'Sekretaris 1', 'Sekretaris', '/anggota/637159545_17893417371411782_4508942944506224394_n..webp'],
        ['Ghefira Nur Karimah', 'Sekretaris 2', 'Sekretaris', '/anggota/637212417_17893417725411782_2920826417516928908_n..webp'],
        ['Annadzira Sukma Kamila', 'Koordinator PSDM', 'Pengembangan Sumber Daya Mahasiswa', '/anggota/633632667_17893412919411782_8560237054708599174_n..webp'],
        ['Keisha Refanaura Hakim', 'Koordinator Medinfo', 'Media Informasi & Teknologi', '/anggota/637235845_17893409850411782_7305827936777666534_n..webp'],
        ['Kurnia Rahayu', 'Koordinator Humas', 'Hubungan Masyarakat', '/anggota/637716635_17893386393411782_596907200205409086_n..jpg']
      ];
      for (const [name, pos, div, img] of defaultOfficers) {
        await c.execute({
          sql: 'INSERT INTO officers (name, position, division_name, image_url) VALUES (?, ?, ?, ?)',
          args: [name, pos, div, img]
        });
      }

      // Seed events (one-time)
      const defaultEvents = [
        ['Webinar AI & Sains Data Modern', 'Eksplorasi tren kecerdasan buatan dan pemanfaatannya dalam riset sains dan industri modern.', '2026-09-25', '14:00 WIB', 'Zoom Meeting / Online', 'Webinar', 'Mendatang', 1],
        ['Workshop UI/UX & Web Development', 'Pelatihan intensif perancangan produk digital interaktif dan implementasi frontend modern.', '2026-10-10', '09:00 WIB', 'Aula UT Bandung & Online', 'Workshop', 'Mendatang', 1],
        ['FST Expo & Science Festival 2026', 'Pameran karya inovasi dan teknologi mahasiswa Fakultas Sains dan Teknologi se-Indonesia.', '2026-11-15', '08:00 WIB', 'Kampus UT Bandung', 'Festival', 'Mendatang', 1]
      ];
      for (const [title, desc, edate, etime, loc, cat, stat, pub] of defaultEvents) {
        await c.execute({
          sql: 'INSERT INTO events (title, description, event_date, event_time, location, category, status, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          args: [title, desc, edate, etime, loc, cat, stat, pub]
        });
      }

      // Seed academic info (one-time)
      const defaultAcad = [
        ['Panduan Tuton & Tutorial Online 2026', 'Informasi mengenai jadwal inisiasi mingguan, tugas 1, 2, dan 3 pada platform E-Learning.', 'Tuton', 'https://elearning.ut.ac.id', 1],
        ['Jadwal Ujian Akhir Semester (UAS) FST', 'Informasi jadwal dan lokasi ujian tatap muka maupun ujian online take-home exam.', 'Jadwal', 'https://sia.ut.ac.id', 1],
        ['Kalender Akademik Semester Ganjil 2026/2027', 'Kalender resmi masa registrasi mata kuliah, pembayaran, dan batas unggah karya ilmiah.', 'Kalender Akademik', 'https://ut.ac.id', 1]
      ];
      for (const [title, content, type, link, pub] of defaultAcad) {
        await c.execute({
          sql: 'INSERT INTO academic_info (title, content, type, link_url, is_published) VALUES (?, ?, ?, ?, ?)',
          args: [title, content, type, link, pub]
        });
      }

      // Seed achievements (one-time)
      const achs = [
        [
          'Lutfi Ardiansyah',
          'Juara 1 Desain Poster Ilmiah',
          'DISPORSENI Nasional UT 2026',
          'Nasional',
          '2026-08-15',
          '/prestasi/lutfi.png',
          'Mahasiswa S1 Sistem Informasi yang berprestasi mewakili Fakultas Sains dan Teknologi Universitas Terbuka Bandung pada ajang DISPORSENI Nasional UT 2026.',
          1,
          1
        ],
        [
          'Wasil Mawardi Assul Toni',
          'Juara 2 Debat Ilmiah Sains',
          'DISPORSENI Nasional UT 2026',
          'Nasional',
          '2026-08-16',
          '/prestasi/wasil.png',
          'Mahasiswa S1 Sistem Informasi yang berprestasi mewakili Fakultas Sains dan Teknologi Universitas Terbuka Bandung pada ajang DISPORSENI Nasional UT 2026.',
          1,
          1
        ],
        [
          'Alfi Tahar',
          'Juara 1 Data Science Competition',
          'DISPORSENI Nasional UT 2026',
          'Nasional',
          '2026-08-17',
          '/prestasi/alfi.png',
          'Mahasiswa S1 Sains & Data yang berprestasi mewakili Fakultas Sains dan Teknologi Universitas Terbuka Bandung pada ajang DISPORSENI Nasional UT 2026.',
          1,
          1
        ]
      ];

      for (const [sName, title, award, level, date, img, desc, pub, feat] of achs) {
        await c.execute({
          sql: `INSERT INTO achievements 
                (student_name, title, award_name, level, award_date, image_url, description, is_published, is_featured) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [sName, title, award, level, date, img, desc, pub, feat]
        });
      }

      console.log('✅ Default seed data created successfully!');
    }
    isInitialized = true;
  } catch (err) {
    console.error('Error in ensureTables:', err);
  }
    })();
  }
  return ensurePromise;
}

// Convert PostgreSQL style parameters ($1, $2) and MySQL style (?) to LibSQL
function normalizeSql(sqlString: string): string {
  // Convert Postgres $1, $2 to ?
  let sql = sqlString.replace(/\$\d+/g, '?');

  // Convert MySQL CURDATE() to SQLite date('now')
  sql = sql.replace(/CURDATE\(\)/gi, "date('now')");

  // Convert CURRENT_DATE to date('now')
  sql = sql.replace(/CURRENT_DATE/gi, "date('now')");

  // Convert Boolean TRUE/FALSE literals in SQL to 1/0
  sql = sql.replace(/=\s*TRUE/gi, '= 1');
  sql = sql.replace(/=\s*FALSE/gi, '= 0');

  // Convert ON DUPLICATE KEY UPDATE / ON CONFLICT
  sql = sql.replace(
    /ON CONFLICT\s*\(setting_key\)\s*DO UPDATE SET setting_value\s*=\s*EXCLUDED\.setting_value/gi,
    'ON CONFLICT(setting_key) DO UPDATE SET setting_value=excluded.setting_value'
  );

  return sql;
}

export function getDb() {
  if (building) {
    return {
      query: async () => [[], []],
      execute: async () => [[], []],
      getConnection: async () => ({
        query: async () => [[], []],
        execute: async () => [[], []],
        beginTransaction: async () => {},
        commit: async () => {},
        rollback: async () => {},
        release: () => {}
      })
    } as any;
  }

  const c = getClient();

  const queryFn = async (sqlString: string, params: any[] = []) => {
    await ensureTables(c);
    const cleanSql = normalizeSql(sqlString);
    const result = await c.execute({ sql: cleanSql, args: params });
    // result.rows is an array of objects
    const rows = Array.from(result.rows).map((row) => ({ ...row }));
    return [rows, result.columns];
  };

  const executeFn = async (sqlString: string, params: any[] = []) => {
    await ensureTables(c);
    const cleanSql = normalizeSql(sqlString);
    const result = await c.execute({ sql: cleanSql, args: params });
    const rows = Array.from(result.rows).map((row) => ({ ...row }));
    const meta = {
      insertId: Number(result.lastInsertRowid),
      affectedRows: result.rowsAffected,
      lastInsertRowid: result.lastInsertRowid
    };
    return [rows, meta];
  };

  const wrapper = {
    query: queryFn,
    execute: executeFn,
    getConnection: async () => {
      return {
        query: queryFn,
        execute: executeFn,
        beginTransaction: async () => {},
        commit: async () => {},
        rollback: async () => {},
        release: () => {}
      };
    }
  };

  return wrapper;
}
