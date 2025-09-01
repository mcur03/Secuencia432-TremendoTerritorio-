import { Request, Response } from "express";
import { GetByIdUserService } from "../../services/userService/GetByIdUserService";
import { IdUserDto } from "../../dto/UserDto/IdUserDto";

export class GetByIdUserController {
    static async getByIdUser(req: Request, res: Response) {
        try {
            const { idUser } = req.params;

            const result = await GetByIdUserService.getByIdUser(new IdUserDto(Number(idUser)));
            if (result.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}
