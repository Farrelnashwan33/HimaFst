import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function updateProdi() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 8889,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'himafst_portal'
    });

    // We'll delete existing and insert new ones
    // Disable foreign key checks temporarily just in case
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE program_studi');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    const prodiList = [
      'Teknologi Pangan UT Bandung',
      'Agribisnis UT Bandung',
      'Perencanaan dan Wilayah Kota',
      'Sains dan Data UT Bandung',
      'Biologi UT Bandung',
      'Statistika UT Bandung'
    ];

    for (const prodi of prodiList) {
      await connection.query('INSERT INTO program_studi (name) VALUES (?)', [prodi]);
    }

    console.log('Program studi updated successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating program studi:', err.message);
    process.exit(1);
  }
}

updateProdi();
