import db from "../../config/db";
import { RegisterFarmDto } from "../../dto/FarmsDto/RegisterFarmsDto";

export class RegisterFarmsRepository {
  static async createFarm(farm: RegisterFarmDto) {
    const query = `
      INSERT INTO farms (id_user, farm_name, location, farm_description)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      farm.userId,
      farm.farmName,
      farm.location || null,
      farm.description || null
    ];

    const [result]: any = await db.execute(query, values);
    return result.insertId;
  }
}
