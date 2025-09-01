import { UpdateUserDto } from "../../dto/UserDto/UpdateUserDto";
import { UpdateUserRepository } from "../../repositories/userRepository/UpdateUserRepository";

export class UpdateUserService {
  static async updateUser(user: UpdateUserDto) {
    try {
      console.log('Updating user:', user);
      
      const result = await UpdateUserRepository.updateUser(user);
      return result;
    } catch (error) {
      throw new Error("Error updating user: " + (error as Error).message);
    }
  }
}
