import { Request, Response } from 'express';
import { UserProfileService } from '../../services/userService/UserProfileService';

export class UserProfileController {
    static async getUserProfile(req: Request, res: Response) {
        try {
            const { id } = (req as any).user;
            console.log('ID de usuario extraído del token:', id);

            const userProfile = await UserProfileService.getUserProfile(id);
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

