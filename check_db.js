import mysql from 'mysql2/promise';

async function check() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 8889,
      user: 'root',
      password: 'root',
      database: 'himafst_portal'
    });
    const [rows, fields] = await connection.execute('SHOW TABLES LIKE "aspirations"');
    console.log(rows);
    if (rows.length === 0) {
      console.log('Table aspirations does not exist. Creating it...');
      await connection.execute(`
        CREATE TABLE aspirations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          subject VARCHAR(255),
          content TEXT,
          status VARCHAR(50) DEFAULT 'Pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Created aspirations table.');
    } else {
      console.log('Table aspirations already exists.');
    }
    await connection.end();
  } catch (e) {
    console.error(e);
  }
}
check();
