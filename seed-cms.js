import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function seedCms() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 8889,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'himafst_portal',
      multipleStatements: true
    });

    console.log("Creating quick_access table...");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS quick_access (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(50),
        url VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log("Seeding site_settings...");
    const defaultSettings = [
      ['hero_badge', 'PORTAL MAHASISWA'],
      ['hero_title', 'Welcome to Portal Fakultas Sains dan Teknologi 👋'],
      ['hero_subtitle', 'Ruang informasi, aspirasi, kegiatan, dan kolaborasi mahasiswa Fakultas Sains dan Teknologi.'],
      ['org_name', 'Himpunan Mahasiswa Fakultas Sains dan Teknologi'],
      ['faculty_name', 'Fakultas Sains dan Teknologi'],
      ['whatsapp_admin', '081234567890'],
      ['instagram_link', 'https://instagram.com/'],
      ['contact_email', 'admin@himafst.com']
    ];

    for (const [k, v] of defaultSettings) {
      await connection.query(`
        INSERT INTO site_settings (setting_key, setting_value) 
        VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
      `, [k, v]);
    }

    console.log("Seeding quick_access...");
    const qaItems = [
      ['Gabung Himpunan Mahasiswa', 'Pendaftaran anggota baru', 'users', '/dashboard/pendaftaran', 1],
      ['Grup Fakultas Sains dan Teknologi', 'Grup WhatsApp resmi mahasiswa FST', 'message-circle', 'https://tr.ee/OioKVEleBP', 2],
      ['Grup Himpunan Mahasiswa', 'Grup komunikasi internal HIMA', 'users', 'https://tr.ee/OTv0nkc-t5', 3],
      ['Aspirasi Mahasiswa', 'Sampaikan saran dan masukan', 'megaphone', '/dashboard/aspirasi', 4]
    ];

    // Clear existing to avoid duplicates during seed
    await connection.query('TRUNCATE TABLE quick_access');

    for (const [name, desc, icon, url, order] of qaItems) {
      await connection.query(`
        INSERT INTO quick_access (name, description, icon, url, sort_order) 
        VALUES (?, ?, ?, ?, ?)
      `, [name, desc, icon, url, order]);
    }
    
    // Check if there are some dummy announcements, if not, create them
    const [anns] = await connection.query('SELECT COUNT(*) as c FROM announcements');
    if (anns[0].c === 0) {
      await connection.query(`
        INSERT INTO announcements (title, content, is_published) VALUES
        ('Pendaftaran Kepanitiaan PKKMB 2024 Dibuka', 'Silakan mendaftar melalui portal pendaftaran PKKMB 2024.', TRUE),
        ('Jadwal Perwalian Semester Ganjil', 'Perwalian akan dimulai pada tanggal 10 Agustus 2024.', TRUE),
        ('Hasil Seleksi Pengurus Himpunan', 'Selamat kepada para pengurus baru yang telah terpilih.', TRUE)
      `);
    }

    console.log("CMS Data seeded successfully!");
    process.exit(0);

  } catch (err) {
    console.error('Error seeding CMS:', err);
    process.exit(1);
  }
}

seedCms();
