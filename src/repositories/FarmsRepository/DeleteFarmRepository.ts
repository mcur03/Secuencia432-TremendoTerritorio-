import db from "../../config/db";
import { IdFarmDto } from "../../dto/FarmsDto/IdFarmDto";

export class DeleteFarmRepository {
  static async deleteFarm(id: IdFarmDto) {

    const query = `DELETE FROM farms WHERE id = ?`;
    const values = [id.id];
    const [result]: any = await db.execute(query, values);
    return result.affectedRows;
  }

  static async deleteFarmCampesino(id: IdFarmDto, userId: number) {
    const query = `DELETE FROM farms WHERE id = ? AND userId = ?`;
    const values = [id.id, userId];
    const [result]: any = await db.execute(query, values);
    return result.affectedRows;
  }
}
