import { Request, Response } from "express";
import { RegisterFarmsService } from "../../services/FarmsService/RegisterFarmsService";

export class RegisterFarmsController {
  static async registerFarm(req: Request, res: Response) {
    try {
      const farmData = req.body;

      const result = await RegisterFarmsService.registerFarm(farmData);
      res.status(201).json({ message: 'Finca registrada con éxito', result });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
