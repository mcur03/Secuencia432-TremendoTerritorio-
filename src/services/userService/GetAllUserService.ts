import { GetAllUserDto } from "../../dto/UserDto/GetAllUserDto";
import { GetAllUsersRepository } from "../../repositories/userRepository/GetAllUserRepository";

export class GetAllUsersService {
  static async getAllUsers(): Promise<GetAllUserDto[]> {
    try {
      return await GetAllUsersRepository.getAllUsers();
    } catch (error) {
      throw new Error("Error fetching users: " + (error as Error).message);
    }
  }
}
