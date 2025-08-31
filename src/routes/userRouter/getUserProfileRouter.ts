import { Router } from 'express';
import { UserProfileController } from '../../controllers/userControllers/UserProfileController';
import verifyToken from '../../middleware/verifyToken';

const router = Router();

router.get('/userProfile', verifyToken, UserProfileController.getUserProfile);

export default router;
