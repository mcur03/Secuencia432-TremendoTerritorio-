import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import authRouter from './src/routes/authRouter/authRouter';
import imagesRouter from "./src/routes/authRouter/imagesRouter";

import registerUserRouter from './src/routes/userRouter/registerUserRouter';
import getAllUsersRouter from './src/routes/userRouter/getAllUsersRouter';
import getByIdUserRouter from './src/routes/userRouter/getByIdUserRouter'
import updateUserRouter from './src/routes/userRouter/UpdateUserRouter';
import deleteUserRouter from './src/routes/userRouter/DeleteUserRouter';
import getUserProfileRouter from './src/routes/userRouter/getUserProfileRouter';
import updateUserProfileRouter from './src/routes/userRouter/UpdateProlifeRouter';

import registerFarmsRouter from './src/routes/farmsRouter/RegisterFarmsRoutes';
import updateFarmsRouter from './src/routes/farmsRouter/UpdateFarmsRoutes';
import getAllFarmsRouter from './src/routes/farmsRouter/GetAllFarmsRoutes';
import getByIdFarmRouter from './src/routes/farmsRouter/GetByIdFarmRoute';
import deleteFarmRouter from './src/routes/farmsRouter/DeleteFarmsRoute';

import uploadImageRouter from './src/routes/botWhatsapp/uploadImageCloudinaryRouter';
import hashPin from './src/routes/botWhatsapp/hashPinRouter';

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
app.use('/api/auth', authRouter);

// users
app.use('/api', registerUserRouter);
app.use('/api', getAllUsersRouter);
app.use('/api', getByIdUserRouter);
app.use('/api', updateUserRouter);
app.use('/api', deleteUserRouter);

app.use('/api', getUserProfileRouter);
app.use('/api', updateUserProfileRouter);

// farms
app.use('/api', registerFarmsRouter);
app.use('/api', updateFarmsRouter);
app.use('/api', getAllFarmsRouter);
app.use('/api', getByIdFarmRouter);
app.use('/api', deleteFarmRouter);

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