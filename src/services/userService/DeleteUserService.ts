import { IdUserDto } from "../../dto/UserDto/IdUserDto";
import { DeleteUserRepository } from "../../repositories/userRepository/DeleteUserRepository";

export class DeleteUserService {
  static async deleteUser(id: IdUserDto) {
    try {
      return await DeleteUserRepository.deleteUser(id);
    } catch (error) {
      throw new Error("Error fetching users: " + (error as Error).message);
    }
  }
}
