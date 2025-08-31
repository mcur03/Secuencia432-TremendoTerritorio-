import { UserProfileRepository } from "../../repositories/userRepository/UserProfileRepository";

export class UserProfileService {
  static async getUserProfile(userId: number) {
    return await UserProfileRepository.getUserProfile(userId);
  }
}
