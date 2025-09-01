import db from "../../config/db";
import { IdUserDto } from "../../dto/UserDto/IdUserDto";

export class DeleteUserRepository {
  static async deleteUser(id: IdUserDto) {

    const query = `DELETE FROM users WHERE id = ?`;
    const values = [id.idUser];
    const [result]: any = await db.execute(query, values);
    return result.affectedRows;
  }
}
