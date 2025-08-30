import { Router } from 'express';
import { GetByIdFarmController } from '../../controllers/FarmsController/GetByIdFarmController';


const router = Router();

// Endpoint para obtener una finca por ID
router.get('/get-by-id-farm/:idFarm', GetByIdFarmController.getByIdFarm);

export default router;
