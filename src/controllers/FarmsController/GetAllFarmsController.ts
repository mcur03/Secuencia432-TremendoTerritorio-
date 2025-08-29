import { Request, Response } from "express";
import { GetAllFarmsService } from "../../services/FarmsService/GetAllFarmsService";

export class GetAllFarmsController {
  static async getAllFarms(_req: Request, res: Response) {
    try {
      const result = await GetAllFarmsService.getAllFarms();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
