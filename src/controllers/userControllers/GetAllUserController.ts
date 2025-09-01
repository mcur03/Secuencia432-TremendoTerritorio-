import { Request, Response } from "express";
import { GetAllUsersService } from "../../services/userService/GetAllUserService";

export class GetAllUsersController {
  static async getAllUsers(_req: Request, res: Response) {
    try {
      const result = await GetAllUsersService.getAllUsers();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
