import { Request, Response } from 'express';
import RegisterUserService from '../../services/userService/registerUserService';

export class RegisterUserController {
  static async getAvailableImages(_req: Request, res: Response) {
    try {
      const images = await RegisterUserService.getAvailableImagesForRegistration();
      res.json({ images });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      await RegisterUserService.register(req.body);
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
