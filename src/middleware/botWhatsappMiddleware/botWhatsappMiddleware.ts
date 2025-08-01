import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback, MulterError } from 'multer';

// Configuración mejorada de Multer
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1, // Solo un archivo
    fieldSize: 100 * 1024, // 100KB para campos de texto
  },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Validación más estricta de tipos de imagen
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/webp',
      'image/gif'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}. Solo se permiten: ${allowedMimeTypes.join(', ')}`));
    }
  },
});

// Middleware para manejo de errores de Multer
export const handleMulterError = (
  error: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  if (error instanceof MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        res.status(400).json({
          success: false,
          error: 'El archivo es demasiado grande. Tamaño máximo: 5MB',
          error_code: 'FILE_TOO_LARGE'
        });
        return;
        
      case 'LIMIT_FILE_COUNT':
        res.status(400).json({
          success: false,
          error: 'Solo se permite un archivo por vez',
          error_code: 'TOO_MANY_FILES'
        });
        return;
        
      case 'LIMIT_UNEXPECTED_FILE':
        res.status(400).json({
          success: false,
          error: 'Campo de archivo inesperado. Use el campo "image"',
          error_code: 'UNEXPECTED_FIELD'
        });
        return;
        
      default:
        res.status(400).json({
          success: false,
          error: `Error de subida: ${error.message}`,
          error_code: 'MULTER_ERROR'
        });
        return;
    }
  }
  
  // Error personalizado de fileFilter
  if (error.message.includes('Tipo de archivo no permitido')) {
    res.status(400).json({
      success: false,
      error: error.message,
      error_code: 'INVALID_FILE_TYPE'
    });
    return;
  }
  
  // Otros errores
  next(error);
};

// Middleware para validar campos requeridos
export const validateUploadFields = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  const { user_phone } = req.body;
  
  if (!user_phone) {
    res.status(400).json({
      success: false,
      error: 'El campo user_phone es requerido',
      error_code: 'MISSING_REQUIRED_FIELD'
    });
    return;
  }
  
  // Validar formato de teléfono (opcional)
  const phoneRegex = /^\+?[\d\s-()]+$/;
  if (!phoneRegex.test(user_phone)) {
    res.status(400).json({
      success: false,
      error: 'Formato de teléfono inválido',
      error_code: 'INVALID_PHONE_FORMAT'
    });
    return;
  }
  
  next();
};