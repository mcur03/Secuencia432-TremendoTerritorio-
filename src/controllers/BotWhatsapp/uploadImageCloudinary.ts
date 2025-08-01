import { Request, Response } from 'express';
import cloudinary from '../../config/cloudinary';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

interface ImageMetadata {
  upload_purpose?: string;
  user_role?: string;
  mime_type?: string;
  file_name?: string;
}

export const uploadImage = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    // Validación de archivo
    if (!req.file) {
      res.status(400).json({ 
        success: false, 
        error: 'No se recibió ningún archivo de imagen' 
      });
      return;
    }

    // Validación de campos requeridos
    const { user_phone } = req.body;
    if (!user_phone) {
      res.status(400).json({
        success: false,
        error: 'El campo user_phone es requerido'
      });
      return;
    }

    // Extraer y validar datos del request
    const {
      image_metadata,
      folder_path,
      public_id_prefix,
      context,
      upload_timestamp,
    } = req.body;

    let metadata: ImageMetadata = {};
    try {
      metadata = typeof image_metadata === 'string'
        ? JSON.parse(image_metadata)
        : (image_metadata || {});
    } catch (parseError) {
      console.error('Error parsing image_metadata:', parseError);
      metadata = {};
    }

    // Generar public_id único y seguro
    const timestamp = Date.now();
    const publicId = `${public_id_prefix || `user_${user_phone}`}_${timestamp}`;

    // Configuración optimizada para Cloudinary
    const uploadOptions = {
      folder: folder_path || 'tremendo_territorio/profile_images',
      public_id: publicId,
      overwrite: true,
      resource_type: 'image' as const,
      format: 'jpg',
      quality: 'auto:good',
      fetch_format: 'auto',
      
      // Transformaciones optimizadas
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto:good' },
        { dpr: 'auto' }, // Responsive para diferentes densidades de pantalla
      ],
      
      // Metadata contextual
      context: {
        user_phone: user_phone,
        upload_purpose: metadata?.upload_purpose || 'profile_image',
        user_role: metadata?.user_role || 'user',
        upload_timestamp: upload_timestamp || new Date().toISOString(),
        original_filename: req.file.originalname || 'unknown',
      },
      
      // Tags para organización y búsqueda
      tags: [
        'profile',
        'tremendo_territorio',
        metadata?.user_role || 'user',
        user_phone,
        `upload_${timestamp}`
      ],
    };

    console.log(`🚀 Iniciando upload para usuario ${user_phone}...`);

    // Upload a Cloudinary con mejor manejo de errores
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error('❌ Error de Cloudinary:', error);
            reject(error);
          } else {
            console.log(`✅ Upload exitoso:`, {
              public_id: result?.public_id,
              bytes: result?.bytes,
              format: result?.format
            });
            resolve(result);
          }
        }
      );
      
      uploadStream.end(req.file!.buffer);
    });

    // Generar URLs adicionales de forma más eficiente
    const baseUrlOptions = { secure: true, fetch_format: 'auto', quality: 'auto:good' };
    
    const thumbnailUrl = cloudinary.url(result.public_id, {
      ...baseUrlOptions,
      width: 150,
      height: 150,
      crop: 'fill',
      gravity: 'face'
    });
    
    const mediumUrl = cloudinary.url(result.public_id, {
      ...baseUrlOptions,
      width: 300,
      height: 300,
      crop: 'fill',
      gravity: 'face'
    });

    // Respuesta estructurada para n8n
    res.json({
      success: true,
      data: {
        // URLs principales
        cloudinary_url: result.secure_url,
        public_id: result.public_id,
        cloudinary_public_id: result.public_id,
        
        // Información del archivo
        image_format: result.format,
        image_size: result.bytes,
        width: result.width,
        height: result.height,
        
        // URLs adicionales
        thumbnail_url: thumbnailUrl,
        medium_url: mediumUrl,
        
        // Datos para continuar el flujo
        user_phone: user_phone,
        context: context,
        upload_timestamp: upload_timestamp || new Date().toISOString(),
        
        // Metadata adicional
        upload_info: {
          original_filename: req.file.originalname,
          original_mimetype: req.file.mimetype,
          upload_date: new Date().toISOString(),
          cloudinary_version: result.version,
          etag: result.etag
        }
      },
      message: `Imagen subida exitosamente para usuario ${user_phone}`
    });

  } catch (error: any) {
    console.error('❌ Error general en uploadImage:', {
      error: error.message,
      stack: error.stack,
      user_phone: req.body?.user_phone
    });
    
    // Respuesta de error estructurada
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor al subir la imagen',
      error_code: 'UPLOAD_FAILED',
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : undefined,
      timestamp: new Date().toISOString()
    });
  }
};