import db from '../../config/db';
import { UpdateUserDto } from '../../dto/UserDto/UpdateUserDto';

export class UpdateUserRepository {
  static async updateUser(user: UpdateUserDto) {
    const query = `
      UPDATE users
      SET first_name = ?, last_name = ?, email = ?, user_phone = ?
      WHERE id = ?
    `;

    const values = [
      user.first_name,
      user.last_name,
      user.email,
      user.user_phone,
      user.id
    ];

    const [result]: any = await db.query(query, values);
    return result;
  }
}
