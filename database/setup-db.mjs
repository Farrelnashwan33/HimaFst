import { createPool } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local manually for the script
import { config } from 'dotenv';
config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  if (!process.env.POSTGRES_URL) {
    console.error("❌ ERROR: POSTGRES_URL belum diset!");
    console.error("Pastikan Anda sudah menjalankan 'vercel env pull .env.local' dan database sudah dibuat di dashboard Vercel.");
    process.exit(1);
  }

  const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
  });

  try {
    console.log("Membangun struktur database (schema)...");
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log("✅ Schema berhasil dibuat!");

    console.log("Memasukkan data awal (seed)...");
    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    await pool.query(seed);
    console.log("✅ Data awal berhasil dimasukkan!");

    console.log("🎉 SELESAI! Database siap digunakan.");
  } catch (error) {
    console.error("❌ Terjadi kesalahan saat membangun database:", error);
  } finally {
    await pool.end();
  }
}

run();
