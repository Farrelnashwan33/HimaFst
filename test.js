import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 8889,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'himafst_portal'
  });
  try {
      await connection.query('SELECT COUNT(*) as count FROM programs');
      console.log("programs OK");
      await connection.query('SELECT setting_key, setting_value FROM site_settings');
      console.log("settings OK");
      await connection.query('SELECT * FROM quick_access WHERE is_active = TRUE ORDER BY sort_order ASC');
      console.log("quick access OK");
  } catch (err) {
      console.error("FAIL:", err.message);
  }
  process.exit();
}
check();
