import { Pool } from 'pg';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';

let pool: Pool | null = null;

// Helper to translate MySQL queries to Postgres queries
function translateQuery(sqlString: string): string {
  let i = 1;
  // Replace all '?' with '$1', '$2', etc.
  let translated = sqlString.replace(/\?/g, () => `$${i++}`);
  // Replace CURDATE() with CURRENT_DATE
  translated = translated.replace(/CURDATE\(\)/gi, 'CURRENT_DATE');
  // Replace ON DUPLICATE KEY UPDATE for site_settings
  translated = translated.replace(
    /ON DUPLICATE KEY UPDATE setting_value\s*=\s*VALUES\(setting_value\)/gi,
    'ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value'
  );
  return translated;
}

export function getDb() {
  if (building) {
    return {
      query: async () => [[], []],
      execute: async () => [[], []],
      getConnection: async () => ({
        query: async () => [[], []],
        execute: async () => [[], []],
        beginTransaction: async () => {},
        commit: async () => {},
        rollback: async () => {},
        release: () => {}
      })
    } as any;
  }
  
  if (!pool) {
    const connectionString = env.POSTGRES_URL || process.env.POSTGRES_URL || env.DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('Database URL belum dikonfigurasi. Harap tentukan DATABASE_URL atau POSTGRES_URL di environment variable.');
    }
    
    // Check if SSL is required (for hosted Postgres like Neon, Supabase, Vercel Postgres)
    const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
    
    pool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 10000,
      max: 10,
    });
  }

  const queryFn = async (sqlString: string, params: any[] = []) => {
    const pgSql = translateQuery(sqlString);
    const result = await pool!.query(pgSql, params);
    return [result.rows, result.fields];
  };

  // Create a wrapper that acts like mysql2 / pg compatible
  const wrapper = {
    query: queryFn,
    execute: queryFn,
    getConnection: async () => {
      const client = await pool!.connect();
      const clientQuery = async (sqlString: string, params: any[] = []) => {
        const pgSql = translateQuery(sqlString);
        const result = await client.query(pgSql, params);
        return [result.rows, result.fields];
      };
      return {
        query: clientQuery,
        execute: clientQuery,
        beginTransaction: () => client.query('BEGIN'),
        commit: () => client.query('COMMIT'),
        rollback: () => client.query('ROLLBACK'),
        release: () => client.release()
      };
    }
  };

  return wrapper;
}



