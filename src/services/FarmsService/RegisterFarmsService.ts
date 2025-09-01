import { RegisterFarmDto } from "../../dto/FarmsDto/RegisterFarmsDto";
import { RegisterFarmsRepository } from "../../repositories/FarmsRepository/RegisterFarmsRepository";

export class RegisterFarmsService {
  static async registerFarm(farm: RegisterFarmDto) {
    try {
      const farmId = await RegisterFarmsRepository.createFarm(farm);
      return { farmId, ...farm };
    } catch (error) {
      throw new Error("Error registering farm: " + (error as Error).message);
    }
  }

  static async registerFarmPeasant(farm: RegisterFarmDto) {
    try {
      const farmId = await RegisterFarmsRepository.createFarmPeasant(farm);
      return { farmId, ...farm };
    } catch (error) {
      throw new Error("Error registering farm: " + (error as Error).message);
    }
  }
}
