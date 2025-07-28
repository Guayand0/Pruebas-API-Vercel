import mysql from 'mysql2/promise';

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  if (id === 'all') {
    const [rows] = await connection.execute('SELECT * FROM numeros');
    await connection.end();
    return Response.json(rows);
  }

  const [rows] = await connection.execute('SELECT * FROM numeros WHERE id = ?', [id]);
  await connection.end();

  if (rows.length === 0) {
    return Response.json({ numero: -1, texto: "NULL" });
  }

  const data = rows[0];
  return Response.json({ numero: data.id, texto: data.texto });
}
