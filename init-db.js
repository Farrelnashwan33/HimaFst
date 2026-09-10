import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function init() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 8889,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root'
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS himafst_portal');
    await connection.query('USE himafst_portal');

    const schema = fs.readFileSync('database/schema.sql', 'utf8');
    
    // split schema by semicolon to run statements sequentially if multipleStatements is off
    const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);
    for (let stmt of statements) {
      await connection.query(stmt);
    }
    
    const [prodi] = await connection.query('SELECT COUNT(*) as count FROM program_studi');
    if (prodi[0].count === 0) {
      console.log('Inserting default program studi...');
      await connection.query(`INSERT INTO program_studi (name) VALUES ('Sistem Informasi'), ('Teknik Informatika'), ('Biologi'), ('Matematika')`);
    }

    console.log('Database created and initialized successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err.message);
    process.exit(1);
  }
}

init();
