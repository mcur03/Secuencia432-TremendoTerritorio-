import db from '../../config/db';
import { RegisterDto } from '../../dto/UserDto/RegisterUserDto';

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
    INSERT INTO users (first_name, last_name, email, id_number, user_phone, pin, selected_image_id, userRole)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
    const values = [
      user.first_name,
      user.last_name,
      user.email,
      user.id_number,
      user.user_phone,
      hashedPin,
      user.selectedImageId,
      user.userRole
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

  static async isIdNumberTaken(id_number: string) {
    const [rows] = await db.query('SELECT id FROM users WHERE id_number = ?', [id_number]);
    return Array.isArray(rows) && rows.length > 0;
  }
}


export default RegisterUserRepository;