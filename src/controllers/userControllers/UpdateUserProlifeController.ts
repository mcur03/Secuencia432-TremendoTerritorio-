import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/userService/UpdateUserService';
import { UpdateUserDto } from '../../dto/UserDto/UpdateUserDto';

export class UpdateProlifeController {
  static async updateProlife(req: Request, res: Response) {
    try {
      const { id } = (req as any).user;
      const { data } = req.body;
      if (!id) {
        res.status(400).json({ error: "Usuario no encontrado" });
        return;
      }

      const result = await UpdateUserService.updateUser(new UpdateUserDto(Number(id), data.first_name, data.last_name, data.email, data.user_phone));

      if (!result || result.affectedRows === 0) {
        res.status(404).json({ error: "Usuario no encontrado." });
      } else {
        res.status(200).json({ status: 'ok, Usuario actualizado con éxito' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  }
}
