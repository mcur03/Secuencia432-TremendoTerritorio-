import bcrypt from 'bcrypt';
import { RegisterDto } from '../../dto/UserDto/registerDto';
import RegisterUserRepository from '../../repositories/userRepository/registerUserRepository';

class RegisterUserService {
  static async getAvailableImagesForRegistration() {
    return await RegisterUserRepository.getAvailableImages();
  }

  static async register(data: RegisterDto) {
    // Verificar si la imagen ya está en uso
    const imageInUse = await RegisterUserRepository.isImageInUse(data.selectedImageId);
    if (imageInUse) {
      throw new Error('La imagen ya está asociada a otro usuario');
    }

    // Hashear el PIN
    const hashedPin = await bcrypt.hash(data.pin, 10);

    // Registrar usuario
    await RegisterUserRepository.registerUser(data.username, data.email, hashedPin, data.selectedImageId);
  }
}

export default RegisterUserService;