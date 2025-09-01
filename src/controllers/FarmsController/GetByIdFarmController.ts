import { Request, Response } from "express";
import { GetByIdFarmService } from "../../services/FarmsService/GetByIdFarmsService";
import { IdFarmDto } from "../../dto/FarmsDto/IdFarmDto";

export class GetByIdFarmController {
    static async getByIdFarm(req: Request, res: Response) {
        try {
            const { idFarm } = req.params;

            const result = await GetByIdFarmService.getByIdFarm(new IdFarmDto(Number(idFarm)));
            if (result.length === 0) {
                res.status(404).json({ message: 'Finca no encontrada' });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}
