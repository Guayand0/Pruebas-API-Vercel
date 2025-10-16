// /api/server-status.js
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    // Conexión a la base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Obtener el estado del servidor
    const [rows] = await connection.execute('SELECT enable FROM server WHERE ID = 1');
    await connection.end();

    if (rows.length === 0) {
      return res.status(200).json({
        online: false,
        message: "⚠️ No se encontró el registro del servidor.",
      });
    }

    const estado = rows[0].enable;

    // Interpretar el valor
    switch (estado) {
      case 1:
        return res.status(200).json({
          online: true,
          mode: "abierto",
          message: "Servidor en línea ✅",
        });

      case 0:
        return res.status(200).json({
          online: false,
          mode: "mantenimiento",
          message: "Servidor en mantenimiento 🛠️",
        });

      case -1:
        return res.status(200).json({
          online: false,
          mode: "cerrado",
          message: "Servidor cerrado 🔒",
        });

      default:
        return res.status(200).json({
          online: false,
          mode: "desconocido",
          message: "⚠️ Estado de servidor no reconocido.",
        });
    }

  } catch (error) {
    console.error("Error al verificar el estado del servidor:", error);
    res.status(500).json({
      online: false,
      mode: "error",
      message: "❌ Error al conectar con la base de datos.",
    });
  }
}
