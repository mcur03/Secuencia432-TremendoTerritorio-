import { Request, Response } from 'express';
import { UpdateFarmsService } from '../../services/FarmsService/UpdateFarmsService';
import type { UpdateFarmDto } from '../../dto/FarmsDto/UpdateFarmsDto';

export class UpdateFarmController {
  static async updateFarm(req: Request, res: Response) {
    try {
      const { id } = req.params; // viene desde la URL
      const data = req.body;

      const updatedFarm = await UpdateFarmsService.updateFarm({ id, ...data } as UpdateFarmDto);

      if (!updatedFarm || updatedFarm.affectedRows === 0) {
        res.status(404).json({ error: "Cliente no encontrado." });
      } else {
        res.status(200).json({ status: 'ok, Cliente actualizado con éxito' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la finca' });
    }
  }
}
