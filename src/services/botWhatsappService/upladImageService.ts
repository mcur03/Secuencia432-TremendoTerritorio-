// src/services/imageService.ts
import cloudinary from '../../config/cloudinary';
import UploadImageRepository from '../../repositories/botWatsappRepository/uploadImageRepository';
export class UploadImageService {
  static async uploadImageToCloudinary(buffer: Buffer, userPhone: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'tremendo_territorio/profile_images',
          public_id: `user_${userPhone}_${Date.now()}`,
          resource_type: 'image',
          format: 'jpg',
          transformation: [{ width: 400, height: 400, crop: 'fill' }]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
  }

  static async processImageUpload(buffer: Buffer, userPhone: string) {
    const cloudinaryResult = await this.uploadImageToCloudinary(buffer, userPhone);
    const imageId = await UploadImageRepository.insertImageUrl(cloudinaryResult.secure_url);
    return {
      imageId,
      cloudinaryUrl: cloudinaryResult.secure_url
    };
  }
}

export default UploadImageService