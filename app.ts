import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import authRoutes from './src/routes/authRouter/authRouter';
import imagesRouter from "./src/routes/authRouter/imagesRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 10000;

// Cargar documentación desde YAML
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (_req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.use('/api', imagesRouter);
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
}).on("error", (error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});

export default app;