import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 10000;

app.get('/', (_req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
}).on("error", (error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});

export default app;