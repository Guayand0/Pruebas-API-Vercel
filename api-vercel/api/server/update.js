import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const enabled = parseInt(req.query.enabled, 10);
  if (isNaN(enabled)) {
    return res.status(400).json({ error: 'Invalid value for enabled' });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [result] = await connection.execute(
      'UPDATE server SET enable = ? WHERE ID = 1',
      [enabled]
    );

    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Server record not found' });
    }

    return res.status(200).json({ success: true, enabled });
  } catch (error) {
    console.error('Error updating server:', error);
    return res.status(500).json({ success: false, error: 'Database error' });
  }
}
