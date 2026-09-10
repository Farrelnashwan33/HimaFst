import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function add() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 8889,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'himafst_portal'
    });

    console.log("Checking for Sistem Informasi...");
    const [rows] = await connection.query("SELECT * FROM program_studi WHERE name LIKE '%Sistem Informasi%'");
    if (rows.length === 0) {
      console.log("Adding Sistem Informasi UT Bandung...");
      await connection.query("INSERT INTO program_studi (name) VALUES ('Sistem Informasi UT Bandung')");
      console.log("Added successfully!");
    } else {
      console.log("Already exists.");
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

add();
