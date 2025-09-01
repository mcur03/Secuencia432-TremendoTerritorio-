import { Router } from 'express';
import { UpdateProlifeController } from '../../controllers/userControllers/UpdateUserProlifeController';
import { validateUserProfileUpdate } from '../../middleware/userMiddleware/UpdateUserProlifeMiddleware';
import verifyToken from '../../middleware/verifyToken';

const router = Router();

// Endpoint para actualizar un usuario
router.put('/update-prolife', verifyToken, validateUserProfileUpdate, UpdateProlifeController.updateProlife);

export default router;
