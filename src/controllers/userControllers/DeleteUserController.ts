import { Request, Response } from "express";
import { DeleteUserService } from "../../services/userService/DeleteUserService";
import { IdUserDto } from "../../dto/UserDto/IdUserDto";

export class DeleteUserController {
    static async deleteUser(req: Request, res: Response) {
        try {
            const { idUser } = req.params;

            const result = await DeleteUserService.deleteUser(new IdUserDto(Number(idUser)));

            if (result === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.status(200).json({ message: 'Usuario eliminado con éxito' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}
