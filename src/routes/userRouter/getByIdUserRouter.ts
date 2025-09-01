import { Router } from 'express';
import { GetByIdUserController } from '../../controllers/userControllers/GetByIdUserController';
import verifyToken from '../../middleware/verifyToken';
import checkRole from '../../middleware/checkRole';

const router = Router();

// Endpoint para obtener un usuario por ID
router.get('/get-by-id-user/:idUser', verifyToken, checkRole(['administrador']), GetByIdUserController.getByIdUser);

export default router;
