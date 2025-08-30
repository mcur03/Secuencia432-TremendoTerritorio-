import db from '../../config/db';
import UpdateFarmDto from '../../dto/FarmsDto/UpdateFarmsDto';

export class UpdateFarmRepository {

  static async updateFarmCampesino(farm: UpdateFarmDto, userId: number) {
    const query = `
      UPDATE farms
      SET farm_name = ?, location = ?, farm_description = ?
      WHERE id = ? AND user_id = ?
    `;

    const values = [
      farm.farmName,
      farm.location || null,
      farm.description || null,
      farm.id,
      userId
    ];

    const [result]: any = await db.query(query, values);
    return result;
  }

  static async updateFarm(data: UpdateFarmDto) {
    const query = `
      UPDATE farms
      SET farm_name = ?, location = ?, farm_description = ?
      WHERE id = ?
    `;

    const values = [
      data.farmName,
      data.location || null,
      data.description || null,
      data.id
    ];

    const [result]: any = await db.query(query, values);
    return result;
  }
}
