import { Request, Response } from "express";
import { DeleteFarmService } from "../../services/FarmsService/DeleteFarmService";
import { IdFarmDto } from "../../dto/FarmsDto/IdFarmDto";

export class DeleteFarmController {
    static async deleteFarm(req: Request, res: Response) {
        try {
            const userRole = req.body.role;
            const userId = req.body.id;
            const { idFarm } = req.params;

            const result =
                userRole === "campesino"
                    ? await DeleteFarmService.deleteFarmCampesino(new IdFarmDto(idFarm), userId)
                    : await DeleteFarmService.deleteFarm(new IdFarmDto(idFarm));

            if (result === 0) {
                res.status(404).json({ message: 'Finca no encontrada' });
            } else {
                res.status(200).json({ message: 'Finca eliminada con éxito' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}
