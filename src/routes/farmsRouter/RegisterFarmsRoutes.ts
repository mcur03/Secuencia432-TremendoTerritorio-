import { Router } from 'express';
import { RegisterFarmsController } from '../../controllers/FarmsController/RegisterFarmsController';
import { validateFarmRegistration } from '../../middleware/farmsMiddleware/RegisterFarmsMiddleware';
import verifyToken from '../../middleware/verifyToken';
import checkRole from '../../middleware/checkRole';

const router = Router();

// Endpoint para registrar una finca
router.post('/register-farm', verifyToken, checkRole(['campesino', 'administrador']), validateFarmRegistration, RegisterFarmsController.registerFarm);

// router.post('/register-farm-peasant', verifyToken, checkRole(['campesino', 'administrador']), validateFarmRegistration, RegisterFarmsController.registerFarmPeasant);

export default router;
