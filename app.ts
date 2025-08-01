import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import authRoutes from './src/routes/authRouter/authRouter';
import imagesRouter from "./src/routes/authRouter/imagesRouter";
import registerUserRoutes from "./src/routes/userRouter/registerUserRouter"
import hashPin from './src/routes/botWhatsapp/hashPinRouter'
import uploadImageRouter from './src/routes/botWhatsapp/uploadImageCloudinaryRouter';

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
app.use('/api', registerUserRoutes);

// Rutas del bot de WhatsApp para hashear el PIN
app.use('/api/botWhatsapp', hashPin);
app.use('/api/botWhatsapp', uploadImageRouter);

// https://secuencia432-tremendoterritorio-production.up.railway.app/api/botWhatsapp/register/hash-pin

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
}).on("error", (error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});

export default app;