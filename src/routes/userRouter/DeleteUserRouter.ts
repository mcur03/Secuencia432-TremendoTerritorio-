import { Router } from 'express';
import { DeleteUserController } from '../../controllers/userControllers/DeleteUserController';
import verifyToken from '../../middleware/verifyToken';
import checkRole from '../../middleware/checkRole';

const router = Router();

// Endpoint para eliminar un usuario
router.delete('/delete-user/:idUser', verifyToken, checkRole(['administrador']), DeleteUserController.deleteUser);

export default router;
