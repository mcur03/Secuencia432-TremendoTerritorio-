import db from '../../config/db';
import { RegisterDto } from '../../dto/UserDto/registerDto';

class RegisterUserRepository {

  static async isImageInUse(imageId: number) {
    const [rows]: any = await db.query(
      'SELECT id FROM users WHERE selected_image_id = ?',
      [imageId]
    );
    return rows.length > 0;
  }

  static async registerUser(user: RegisterDto, hashedPin: string) {
    const query = `
      INSERT INTO users (username, email, cedula, pin, selected_image_id, rol)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      user.nombre,
      user.email,
      user.cedula,
      hashedPin,
      user.selectedImageId,
      user.rol
    ];

    const [result] = await db.query(query, values);
    return result;
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

  static async isEmailTaken(email: string) {
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    return Array.isArray(rows) && rows.length > 0;
  }

  static async isCedulaTaken(cedula: string) {
    const [rows] = await db.query('SELECT id FROM users WHERE cedula = ?', [cedula]);
    return Array.isArray(rows) && rows.length > 0;
  }
}


export default RegisterUserRepository;