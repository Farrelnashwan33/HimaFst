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
      const [rows] = await connection.query('SELECT content FROM announcements');
      console.log(rows);
      
      const [events] = await connection.query('SELECT description FROM events');
      console.log("events:", events);
  } catch (err) {
      console.error("FAIL:", err.message);
  }
  process.exit();
}
check();
