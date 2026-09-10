import mysql from 'mysql2/promise';

async function check() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'himafst_portal'
  });
  const [rows] = await connection.execute('DESCRIBE aspirations');
  console.log(rows);
  await connection.end();
}
check();
