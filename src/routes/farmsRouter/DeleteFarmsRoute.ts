import { Router } from 'express';
import { DeleteFarmController } from '../../controllers/FarmsController/DeleteFarmController';
import verifyToken from '../../middleware/verifyToken';
import checkRole from '../../middleware/checkRole';

const router = Router();

// Endpoint para eliminar una finca
router.delete('/delete-farm/:idFarm', verifyToken, checkRole(['campesino', 'administrador']), DeleteFarmController.deleteFarm);

export default router;
