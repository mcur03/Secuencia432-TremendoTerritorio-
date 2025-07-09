import db from '../../config/db';

class RegisterUserRepository {

  static async isImageInUse(imageId: number) {
    const [rows]: any = await db.query(
      'SELECT id FROM users WHERE selected_image_id = ?',
      [imageId]
    );
    return rows.length > 0;
  }

  static async registerUser(username: string, email: string, hashedPin: string, imageId: number) {
    await db.query(
      `INSERT INTO users (username, email, pin, selected_image_id) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPin, imageId]
    );
  }

  static async getAvailableImages(limit = 3) {
    const [rows] = await db.query(`
      SELECT ai.id, ai.cloudinary_url
      FROM auth_images ai
      LEFT JOIN users u ON ai.id = u.selected_image_id
      WHERE u.selected_image_id IS NULL AND ai.is_active = 1
      ORDER BY RAND()
      LIMIT ?
    `, [limit]);
    return rows;
  }
}


export default RegisterUserRepository;