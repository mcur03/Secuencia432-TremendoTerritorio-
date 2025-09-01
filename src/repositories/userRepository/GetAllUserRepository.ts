import db from "../../config/db";
import { GetAllUserDto } from "../../dto/UserDto/GetAllUserDto";

export class GetAllUsersRepository {
  static async getAllUsers(): Promise<GetAllUserDto[]> {
    const query = `
      SELECT id, first_name, last_name, email, user_phone, userRole FROM users
    `;
    const [result] = await db.execute(query);
    return result as GetAllUserDto[];
  }
}