import { createClient, VercelClient } from '@vercel/postgres';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';

let client: VercelClient | null = null;

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
  
  if (!client) {
    const connectionString = env.POSTGRES_URL || process.env.POSTGRES_URL || env.DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      const allKeys = Object.keys(process.env).filter(k => !k.includes('SECRET') && !k.includes('KEY'));
      throw new Error(`Database belum terhubung di Vercel Dashboard! Tidak ada URL. Variabel yang ada: ${allKeys.join(', ')}`);
    }
    client = createClient({
      connectionString: connectionString,
    });
  }

  // Create a wrapper that acts like mysql2
  const wrapper = {
    query: async (sqlString: string, params: any[] = []) => {
      // Ensure client is connected before querying
      try { await client!.connect(); } catch (e) {}
      const pgSql = translateQuery(sqlString);
      const result = await client!.query(pgSql, params);
      return [result.rows, result.fields];
    },
    getConnection: async () => {
      try { await client!.connect(); } catch (e) {}
      return {
        query: async (sqlString: string, params: any[] = []) => {
          const pgSql = translateQuery(sqlString);
          const result = await client!.query(pgSql, params);
          return [result.rows, result.fields];
        },
        beginTransaction: () => client!.query('BEGIN'),
        commit: () => client!.query('COMMIT'),
        rollback: () => client!.query('ROLLBACK'),
        release: () => {} // client is reused, no release
      };
    }
  };

  return wrapper;
}

