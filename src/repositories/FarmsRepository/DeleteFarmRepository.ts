import db from "../../config/db";
import { IdFarmDto } from "../../dto/FarmsDto/IdFarmDto";

export class DeleteFarmRepository {
  static async deleteFarm(id: IdFarmDto) {

    const query = `DELETE FROM farms WHERE id = ?`;
    const values = [id.idFarm];
    const [result]: any = await db.execute(query, values);
    return result.affectedRows;
  }

  static async deleteFarmCampesino(id: IdFarmDto, userId: number) {
    console.log('Eliminando finca como campesino REPOSITORY:', id, userId);

    const query = `DELETE FROM farms WHERE id = ? AND id_user = ?`;
    const values = [id.idFarm, userId];
    console.log('Con valores:', values);

    const [result]: any = await db.execute(query, values);
    return result.affectedRows;
  }
}
