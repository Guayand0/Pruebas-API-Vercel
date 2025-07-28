import mysql from 'mysql2/promise';

export async function GET(req) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await connection.execute('SELECT * FROM numeros ORDER BY RAND() LIMIT 1');
  await connection.end();

  const data = rows[0];
  return Response.json({ numero: data.id, texto: data.texto });
}
