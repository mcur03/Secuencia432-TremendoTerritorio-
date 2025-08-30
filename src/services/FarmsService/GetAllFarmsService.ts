import { GetFarmDto } from "../../dto/FarmsDto/GetFarmsDto";
import { GetAllFarmsRepository } from "../../repositories/FarmsRepository/GetAllFarmsRepository";

export class GetAllFarmsService {
  static async getAllFarms(): Promise<GetFarmDto[]> {
    try {
      return await GetAllFarmsRepository.getAllFarms();
    } catch (error) {
      throw new Error("Error fetching farms: " + (error as Error).message);
    }
  }
}
