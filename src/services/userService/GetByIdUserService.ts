import { IdUserDto } from "../../dto/UserDto/IdUserDto";
import { GetByIdUserRepository } from "../../repositories/userRepository/GetUserByIdRepository";

export class GetByIdUserService {
  static async getByIdUser(id: IdUserDto) {
    try {
      return await GetByIdUserRepository.getByIdUser(id);
    } catch (error) {
      throw new Error("Error fetching users: " + (error as Error).message);
    }
  }
}
