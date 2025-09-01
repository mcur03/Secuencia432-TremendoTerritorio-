import { Router } from 'express';
import { GetAllUsersController } from '../../controllers/userControllers/GetAllUserController';
import verifyToken from '../../middleware/verifyToken';
import checkRole from '../../middleware/checkRole';

const router = Router();

router.get('/get-all-users', verifyToken, checkRole(['administrador']), GetAllUsersController.getAllUsers);

export default router;
