import { Router } from 'express';
import { uploadImage } from '../../controllers/BotWhatsapp/uploadImageCloudinary';
import { 
  upload, 
  handleMulterError, 
  validateUploadFields 
} from '../../middleware/botWhatsappMiddleware/botWhatsappMiddleware';

const router = Router();

// Middleware para logging (opcional)
const logUploadAttempt = (req: any, res: any, next: any) => {
  console.log(`📤 Upload attempt from: ${req.ip} - User: ${req.body?.user_phone || 'unknown'}`);
  next();
};

// Ruta principal con middleware en cadena
router.post('/upload-profile-image', 
  logUploadAttempt,
  upload.single('image'),
  handleMulterError,
  validateUploadFields,
  uploadImage
);

// Endpoint de salud para verificar el estado del servicio
router.get('/upload-health', (req, res) => {
  res.json({
    success: true,
    service: 'Image Upload Service',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

export default router;