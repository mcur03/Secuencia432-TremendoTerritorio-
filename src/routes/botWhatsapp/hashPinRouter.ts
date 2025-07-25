import { Router } from 'express';
import hashPin from '../../controllers/BotWhatsapp/hashPin';

const router = Router();

// Endpoint to hash a PIN
router.post('/register/hash-pin', hashPin);


export default router;
