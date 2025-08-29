import db from "../../config/db";
import { GetFarmDto } from "../../dto/FarmsDto/GetFarmsDto";

export class GetAllFarmsRepository {
  static async getAllFarms(): Promise<GetFarmDto[]> {
    const query = `
      SELECT * FROM fincas
    `;
    const [result] = await db.execute(query);
    return result as GetFarmDto[];
  }
}