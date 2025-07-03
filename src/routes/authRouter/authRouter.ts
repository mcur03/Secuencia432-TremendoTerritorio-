import { Router } from 'express';
import { AuthController } from '../../controllers/authController/authController';
import { validateRequest } from '../../middleware/authMiddleware/authMiddleware';

const router = Router();

router.post('/login/start', AuthController.startLogin);
router.post('/login/complete', validateRequest, AuthController.completeLogin);

export default router;
