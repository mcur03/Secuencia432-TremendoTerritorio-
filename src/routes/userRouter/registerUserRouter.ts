import { Router } from 'express';
import { RegisterUserController } from '../../controllers/userControllers/registerUserController';
import { validateRequest } from '../../middleware/userMiddleware/registerUserMiddleware';

const router = Router();

router.get('/register/get-images', RegisterUserController.getAvailableImages); // imágenes aleatorias
router.post('/register', validateRequest, RegisterUserController.register); // registrar usuario

export default router;
