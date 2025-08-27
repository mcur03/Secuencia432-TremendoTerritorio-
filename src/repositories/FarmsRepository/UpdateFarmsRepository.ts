import db from '../../config/db';
import { UpdateFarmDto } from '../../dto/FarmsDto/UpdateFarmsDto';

export class UpdateFarmRepository {
  static async updateFarm(data: UpdateFarmDto) {
    const query = `
      UPDATE fincas
      SET nombre_finca = ?, historia = ?, ubicacion = ?, descripcion = ?
      WHERE id = ?
    `;

    const values = [
      data.farmName,
      data.history || null,
      data.location || null,
      data.description || null,
      data.id
    ];

    const [result]: any = await db.query(query, values);
    return result;
  }
}
