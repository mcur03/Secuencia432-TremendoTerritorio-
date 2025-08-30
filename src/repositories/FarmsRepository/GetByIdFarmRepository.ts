import db from "../../config/db";
import { IdFarmDto } from "../../dto/FarmsDto/IdFarmDto";

export class GetByIdFarmRepository {
  static async getByIdFarm(id: IdFarmDto) {

    const query = `SELECT * FROM farms WHERE id = ?`;
    const values = [id.id];
    const [result] = await db.execute(query, values);
    return result as IdFarmDto[];
  }
}
