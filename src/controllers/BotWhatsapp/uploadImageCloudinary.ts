// src/controllers/imageController.ts
import { Request, Response } from 'express';
import UploadImageService from '../../services/botWhatsappService/upladImageService';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadImage = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No se recibió imagen' });
      return;
    }

    if (!req.body.user_phone) {
      res.status(400).json({ success: false, error: 'user_phone es requerido' });
      return;
    }

    const { user_phone } = req.body;

    const { imageId, cloudinaryUrl } = await UploadImageService.processImageUpload(req.file.buffer, user_phone);

    res.json({
      success: true,
      data: {
        image_id: imageId,
        cloudinary_url: cloudinaryUrl,
        user_phone
      }
    });
  } catch (error: any) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: 'Error al subir imagen',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
