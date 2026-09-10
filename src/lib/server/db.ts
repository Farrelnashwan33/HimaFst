import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

let pool: mysql.Pool | null = null;

export function getDb() {
  if (building) {
    // Return a dummy object during build to prevent connection errors
    return {} as mysql.Pool;
  }
  
  if (!pool) {
    pool = mysql.createPool({
      host: env.DB_HOST || 'localhost',
      port: Number(env.DB_PORT) || 8889, // MAMP Default
      user: env.DB_USER || 'root',
      password: env.DB_PASSWORD || 'root', // MAMP Default
      database: env.DB_DATABASE || 'himafst_portal',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}
