import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Validar que las variables de entorno estén presentes
const requiredEnvVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY', 
  'CLOUDINARY_API_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`❌ Variable de entorno requerida no encontrada: ${envVar}`);
  }
}

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Usar HTTPS siempre
});

// Función para verificar la conectividad (opcional)
export const testCloudinaryConnection = async (): Promise<boolean> => {
  try {
    await cloudinary.api.ping();
    console.log('✅ Conexión a Cloudinary exitosa');
    return true;
  } catch (error) {
    console.error('❌ Error conectando a Cloudinary:', error);
    return false;
  }
};

// Función helper para generar URLs optimizadas
export const generateOptimizedUrl = (
  publicId: string, 
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {}
): string => {
  return cloudinary.url(publicId, {
    secure: true,
    fetch_format: 'auto',
    quality: 'auto:good',
    ...options
  });
};

export default cloudinary;