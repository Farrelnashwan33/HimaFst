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
      await connection.query('SELECT COUNT(*) as count FROM users WHERE role = "mahasiswa"');
      console.log("users OK");
      await connection.query('SELECT COUNT(*) as count FROM events WHERE event_date >= CURDATE()');
      console.log("events OK");
      await connection.query('SELECT COUNT(*) as count FROM achievements');
      console.log("achievements OK");
      
      const q1 = `
    SELECT a.*, u.email as author_email 
    FROM announcements a 
    LEFT JOIN users u ON a.author_id = u.id 
    WHERE a.is_published = TRUE 
    ORDER BY a.created_at DESC LIMIT 3
  `;
      await connection.query(q1);
      console.log("announcements join OK");
      
  } catch (err) {
      console.error("FAIL:", err.message);
  }
  process.exit();
}
check();
