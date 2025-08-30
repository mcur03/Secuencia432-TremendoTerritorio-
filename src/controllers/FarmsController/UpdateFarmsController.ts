import { Request, Response } from 'express';
import { UpdateFarmsService } from '../../services/FarmsService/UpdateFarmsService';
import UpdateFarmDto from '../../dto/FarmsDto/UpdateFarmsDto';

export class UpdateFarmController {
  static async updateFarm(req: Request, res: Response) {
    try {
      const userRole = req.body.role;
      const userId = req.body.id;
      const { id } = req.params; // viene desde la URL
      const data = req.body;

      const result =
        userRole === "campesino"
          ? await UpdateFarmsService.updateFarmCampesino(new UpdateFarmDto(data.id, data.farmName, data.location, data.description), userId)
          : await UpdateFarmsService.updateFarm(new UpdateFarmDto(data.id, data.farmName, data.location, data.description));

      if (!result || result.affectedRows === 0) {
        res.status(404).json({ error: "Finca no encontrada." });
      } else {
        res.status(200).json({ status: 'ok, Finca actualizado con éxito' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la finca' });
    }
  }
}
