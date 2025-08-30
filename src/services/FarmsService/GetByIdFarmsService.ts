import { IdFarmDto } from "../../dto/FarmsDto/IdFarmDto";
import { GetByIdFarmRepository } from "../../repositories/FarmsRepository/GetByIdFarmRepository";

export class GetByIdFarmService {
  static async getByIdFarm(id: IdFarmDto) {
    try {
      return await GetByIdFarmRepository.getByIdFarm(id);
    } catch (error) {
      throw new Error("Error fetching farms: " + (error as Error).message);
    }
  }
}
