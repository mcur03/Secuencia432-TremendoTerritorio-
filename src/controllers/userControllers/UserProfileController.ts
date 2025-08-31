import { Request, Response } from 'express';
import { UserProfileService } from '../../services/userService/UserProfileService';

export class UserProfileController {
    static async getUserProfile(req: Request, res: Response) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const userId = req.user.id;

            const userProfile = await UserProfileService.getUserProfile(userId);
            if (userProfile) {
                res.json(userProfile);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

