import { getDb } from '$lib/server/db';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    const db = getDb();
    const connection = await db.getConnection();
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      const keys = Object.keys(process.env).filter(k => k.includes('POSTGRES') || k.includes('DATABASE') || k.includes('URL') || k.includes('PRISMA'));
      throw new Error("No connection string found. Available keys: " + keys.join(', '));
    }
    
    // SQL Queries embedded directly to avoid file reading issues on Vercel
    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'mahasiswa',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS student_profiles (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        nim VARCHAR(50) DEFAULT NULL,
        program_studi VARCHAR(255) DEFAULT NULL,
        whatsapp VARCHAR(50) DEFAULT NULL,
        semester VARCHAR(10) DEFAULT NULL,
        avatar_url VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_student_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS admin_profiles (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        position VARCHAR(255) DEFAULT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_admin_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS announcements (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_id INT DEFAULT NULL,
        is_published BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_announcement_author FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE SET NULL
      )`,
      `CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT DEFAULT NULL,
        event_date DATE NOT NULL,
        event_time TIME DEFAULT NULL,
        location VARCHAR(255) DEFAULT NULL,
        category VARCHAR(100) DEFAULT NULL,
        status VARCHAR(100) DEFAULT 'Mendatang',
        is_published BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL DEFAULT '',
        level VARCHAR(100) DEFAULT NULL,
        award_name VARCHAR(255) DEFAULT NULL,
        award_date DATE DEFAULT NULL,
        image_url VARCHAR(255) DEFAULT NULL,
        description TEXT DEFAULT NULL,
        is_published BOOLEAN NOT NULL DEFAULT FALSE,
        is_featured BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS quick_access (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        icon VARCHAR(255) DEFAULT NULL,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT DEFAULT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS officers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        division_id INT DEFAULT NULL,
        image_url VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS divisions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS programs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS admin_activity_logs (
        id SERIAL PRIMARY KEY,
        admin_id INT DEFAULT NULL,
        action VARCHAR(50) NOT NULL,
        module VARCHAR(100) DEFAULT NULL,
        description TEXT DEFAULT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_log_user FOREIGN KEY (admin_id) REFERENCES users (id) ON DELETE SET NULL
      )`,
      `CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_chat_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS sessions (
        id VARCHAR(255) PRIMARY KEY,
        user_id INT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,
      // Migration: add new columns if they don't exist yet (safe for existing tables)
      `ALTER TABLE achievements ADD COLUMN IF NOT EXISTS title VARCHAR(255) NOT NULL DEFAULT ''`,
      `ALTER TABLE achievements ADD COLUMN IF NOT EXISTS level VARCHAR(100) DEFAULT NULL`,
      `ALTER TABLE achievements ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT FALSE`,
      `ALTER TABLE achievements ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE`,
      `ALTER TABLE programs ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'draft'`,
      `ALTER TABLE events ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT FALSE`,
    ];

    const results: string[] = [];
    for (const query of queries) {
      try {
        await connection.query(query);
        results.push('OK');
      } catch (e: any) {
        results.push('SKIP: ' + e.message.substring(0, 80));
      }
    }
    
    connection.release();
    return json({ success: true, message: 'Schema setup complete!', results });
  } catch (error: any) {
    console.error('Setup DB Error:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}


