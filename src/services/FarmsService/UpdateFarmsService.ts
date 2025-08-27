import { UpdateFarmDto } from "../../dto/FarmsDto/UpdateFarmsDto";
import { UpdateFarmRepository } from "../../repositories/FarmsRepository/UpdateFarmsRepository";

export class UpdateFarmsService {
  static async updateFarm(farm: UpdateFarmDto) {
    console.log('Service!!!!!', farm);

    try {
      const result = await UpdateFarmRepository.updateFarm(farm);
      return result;
    } catch (error) {
      throw new Error("Error updating farm: " + (error as Error).message);
    }
  }
}
