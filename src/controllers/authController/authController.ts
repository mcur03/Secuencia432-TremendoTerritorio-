import { Request, Response } from 'express';
import AuthService from '../../services/authService/authService';

export class AuthController {
  static async startLogin(req: Request, res: Response) {
    try {
      console.log('entro al controller de inicio de sesión');
      
      const result = await AuthService.startLogin(req.body);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async completeLogin(req: Request, res: Response) {
    try {
      const token = await AuthService.completeLogin(req.body);
      console.log(req.body);
      
      res.json({ token });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
