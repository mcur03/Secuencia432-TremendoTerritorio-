import db from "../../config/db";
import { RegisterFarmDto } from "../../dto/FarmsDto/RegisterFarmsDto";

export class RegisterFarmsRepository {
  static async createFarm(farm: RegisterFarmDto) {
    const query = `
      INSERT INTO fincas (usuario_id, nombre_finca, ubicacion, descripcion)
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
