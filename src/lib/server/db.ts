import { createPool, VercelPool } from '@vercel/postgres';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';

let pool: VercelPool | null = null;

// Helper to translate MySQL queries to Postgres queries
function translateQuery(sqlString: string): string {
  let i = 1;
  // Replace all '?' with '$1', '$2', etc.
  let translated = sqlString.replace(/\?/g, () => `$${i++}`);
  // Replace CURDATE() with CURRENT_DATE
  translated = translated.replace(/CURDATE\(\)/gi, 'CURRENT_DATE');
  return translated;
}

export function getDb() {
  if (building) {
    return {} as any;
  }
  
  if (!pool) {
    const connectionString = env.POSTGRES_URL || process.env.POSTGRES_URL || env.DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("No database connection string found. Please set POSTGRES_URL or DATABASE_URL.");
    }
    // Automatically uses process.env.POSTGRES_URL or env.POSTGRES_URL
    pool = createPool({
      connectionString: connectionString,
    });
  }

  // Create a wrapper that acts like mysql2
  const wrapper = {
    query: async (sqlString: string, params: any[] = []) => {
      const pgSql = translateQuery(sqlString);
      const result = await pool!.query(pgSql, params);
      // Return as [rows, fields] format exactly like mysql2
      return [result.rows, result.fields];
    },
    getConnection: async () => {
      const client = await pool!.connect();
      return {
        query: async (sqlString: string, params: any[] = []) => {
          const pgSql = translateQuery(sqlString);
          const result = await client.query(pgSql, params);
          return [result.rows, result.fields];
        },
        beginTransaction: () => client.query('BEGIN'),
        commit: () => client.query('COMMIT'),
        rollback: () => client.query('ROLLBACK'),
        release: () => client.release()
      };
    }
  };

  return wrapper;
}
