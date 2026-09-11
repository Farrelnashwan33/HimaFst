import { getDb } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const db = getDb();
    const connection = await db.getConnection();
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      const keys = Object.keys(process.env).filter(k => k.includes('POSTGRES') || k.includes('DATABASE') || k.includes('URL') || k.includes('PRISMA'));
      throw new Error("No connection string found. Available keys: " + keys.join(', '));
    }
    
    // Read schema file
    const schemaPath = path.resolve('database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Split queries by semicolon and filter empty ones
    const queries = schemaSql
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));

    for (const query of queries) {
      await connection.query(query);
    }
    
    connection.release();
    return json({ success: true, message: 'Schema successfully created!' });
  } catch (error: any) {
    console.error('Setup DB Error:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
