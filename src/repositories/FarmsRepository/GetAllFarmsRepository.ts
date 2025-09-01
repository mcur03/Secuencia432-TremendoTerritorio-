import db from "../../config/db";
import { GetFarmDto } from "../../dto/FarmsDto/GetAllFarmsDto";

export class GetAllFarmsRepository {
  static async getAllFarms(): Promise<GetFarmDto[]> {
    const query = `
      SELECT * FROM farms
    `;
    const [result] = await db.execute(query);
    return result as GetFarmDto[];
  }
}