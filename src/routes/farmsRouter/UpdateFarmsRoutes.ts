import { Router } from 'express';
import { UpdateFarmController } from '../../controllers/FarmsController/UpdateFarmsController';
import { validateFarmUpdate } from '../../middleware/farmsMiddleware/UpdateFarmsMiddleware';
import verifyToken from '../../middleware/verifyToken';
import checkRole from '../../middleware/checkRole';

const router = Router();

// Endpoint para actualizar una finca
router.put('/update-farm/:id', verifyToken, checkRole(['campesino', 'administrador']), validateFarmUpdate, UpdateFarmController.updateFarm);

export default router;
