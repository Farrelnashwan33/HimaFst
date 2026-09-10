import mysql from 'mysql2/promise';

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'himafst_portal'
  });

  try {
    console.log('Running migration...');
    // Drop foreign key
    await connection.query('ALTER TABLE student_profiles DROP FOREIGN KEY fk_student_prodi').catch(e => console.log('FK already dropped'));
    
    // Drop index
    await connection.query('ALTER TABLE student_profiles DROP INDEX program_studi_id').catch(e => console.log('Index already dropped'));
    
    // Drop the old column
    await connection.query('ALTER TABLE student_profiles DROP COLUMN program_studi_id').catch(e => console.log('Column already dropped'));
    
    // Add the new varchar column
    await connection.query('ALTER TABLE student_profiles ADD COLUMN program_studi VARCHAR(255) DEFAULT NULL').catch(e => console.log('Column already exists'));
    
    // Drop the old table
    await connection.query('DROP TABLE IF EXISTS program_studi');

    console.log('Migration successful!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

run();
