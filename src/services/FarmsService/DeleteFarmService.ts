import { IdFarmDto } from "../../dto/FarmsDto/IdFarmDto";
import { DeleteFarmRepository } from "../../repositories/FarmsRepository/DeleteFarmRepository";

export class DeleteFarmService {
  static async deleteFarm(id: IdFarmDto) {
    try {
      return await DeleteFarmRepository.deleteFarm(id);
    } catch (error) {
      throw new Error("Error fetching farms: " + (error as Error).message);
    }
  }

  static async deleteFarmCampesino(id: IdFarmDto, userId: number) {
    try {
      return await DeleteFarmRepository.deleteFarmCampesino(id, userId);
    } catch (error) {
      throw new Error("Error fetching farms: " + (error as Error).message);
    }
  }
}
