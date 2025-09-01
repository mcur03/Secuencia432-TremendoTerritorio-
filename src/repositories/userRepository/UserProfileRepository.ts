import db from "../../config/db";
import { UserProfileDto } from "../../dto/UserDto/UserProfileDto";

export class UserProfileRepository {
    static async getUserProfile(userId: number) {
      console.log('USERpROLIFE rEPO', userId);
      
        const sql = `SELECT id, first_name, last_name, user_phone, id_number, userRole
          FROM users WHERE id = ?`;

        const values = [userId];
        const [result] = await db.execute(sql, values);
        return result as UserProfileDto[];
    }
}
