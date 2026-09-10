import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 8889,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'himafst_portal'
    });

    const email = 'admin@himafst.com';
    const password = 'pengurushima123';
    const hash = await bcrypt.hash(password, 10);

    const [existing] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      await connection.query('UPDATE users SET password_hash = ? WHERE email = ?', [hash, email]);
      console.log('Admin password updated successfully!');
    } else {
      const [res] = await connection.query('INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)', [email, hash, 'admin']);
      const adminId = res.insertId;
      await connection.query('INSERT INTO admin_profiles (user_id, full_name, role_title) VALUES (?, ?, ?)', [adminId, 'Administrator', 'Pengurus Inti']);
      console.log('Admin user created successfully!');
    }
    
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

seed();
