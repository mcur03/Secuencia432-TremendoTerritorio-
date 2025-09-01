import db from "../../config/db";
import { IdUserDto } from "../../dto/UserDto/IdUserDto";

export class GetByIdUserRepository {
  static async getByIdUser(id: IdUserDto) {

    const query = `SELECT id, first_name, last_name, email, user_phone, userRole FROM users WHERE id = ?`;
    const values = [id.idUser];
    const [result] = await db.execute(query, values);
    return result as IdUserDto[];
  }
}
