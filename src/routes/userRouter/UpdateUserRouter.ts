import { Router } from 'express';
import { UpdateUserController } from '../../controllers/userControllers/UpdateUserController';
import { validateUserUpdate } from '../../middleware/userMiddleware/UpdateUserMiddleware';
import verifyToken from '../../middleware/verifyToken';
import checkRole from '../../middleware/checkRole';

const router = Router();

// Endpoint para actualizar un usuario
router.put('/update-user/:id', verifyToken, validateUserUpdate, checkRole(['administrador']), UpdateUserController.updateUser);

export default router;
