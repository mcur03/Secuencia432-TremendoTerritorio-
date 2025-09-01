import { Request, Response } from "express";
import { RegisterFarmsService } from "../../services/FarmsService/RegisterFarmsService";
import { RegisterFarmDto } from "../../dto/FarmsDto/RegisterFarmsDto";

export class RegisterFarmsController {
  static async registerFarm(req: Request, res: Response) {
    try {
      // Datos del token (middleware de auth los inyecta en req.user)
      const { id, userRole } = (req as any).user;

      // Si es campesino, el id sale del token
      // Si es administrador, puede mandar en el body el id de otro usuario
      const targetUserId = userRole === "administrador" ? req.body.userId : id;

      if (!targetUserId) {
        res.status(400).json({ message: "Debe especificar el usuario dueño de la finca" });
        return;
      }

      const farmData = req.body;

      const dto = new RegisterFarmDto(
        targetUserId,
        farmData.farmName,
        farmData.location,
        farmData.description
      );

      const result = await RegisterFarmsService.registerFarm(dto);

      res.status(201).json({ message: 'Finca registrada con éxito', result });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}