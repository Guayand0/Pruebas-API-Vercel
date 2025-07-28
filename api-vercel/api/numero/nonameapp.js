import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await connection.execute('SELECT * FROM numeros WHERE id BETWEEN 0 AND 10 ORDER BY id ASC');
  await connection.end();

  // Mapea filas a array de objetos { id, texto }
  const numeros = rows.map(row => ({
    id: row.id,
    texto: row.texto,
  }));

  return Response.json({ numeros });
}
