import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/userService/UpdateUserService';
import { UpdateUserDto } from '../../dto/UserDto/UpdateUserDto';

export class UpdateUserController {
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

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
