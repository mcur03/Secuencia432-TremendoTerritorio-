import db from '../../config/db';

class UploadImageRepository {
  static async insertImageUrl(cloudinaryUrl: string): Promise<number> {
    const insertQuery = `
      INSERT INTO auth_images (cloudinary_url) 
      VALUES (?)
    `;
    const [result]: any = await db.execute(insertQuery, [cloudinaryUrl]);
    return result.insertId;
  }
}

export default UploadImageRepository;

