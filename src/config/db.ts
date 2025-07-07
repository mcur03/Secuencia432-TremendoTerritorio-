import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config();


const sslConfig = process.env.DB_SSL === 'true'
  ? { rejectUnauthorized: false } // o true si cuentas con el certificado adecuado
  : undefined;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 3306,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: sslConfig
});

// Probar la conexión
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conexión a la base de datos exitosa.');
    connection.release(); // Liberar la conexión al pool
  }
});
  
export default db.promise();