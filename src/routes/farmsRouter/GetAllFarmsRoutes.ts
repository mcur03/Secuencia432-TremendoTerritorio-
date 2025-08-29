import { Router } from 'express';
import { GetAllFarmsController } from '../../controllers/FarmsController/GetAllFarmsController';


const router = Router();

// Endpoint para obtener todas las fincas
router.get('/get-all-farms',  GetAllFarmsController.getAllFarms);

export default router;
