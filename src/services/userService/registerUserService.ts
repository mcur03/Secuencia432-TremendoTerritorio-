import bcrypt from 'bcrypt';
import { RegisterDto } from '../../dto/UserDto/RegisterUserDto';
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

    // Validaciones
    const emailExists = await RegisterUserRepository.isEmailTaken(data.email);
    if (emailExists) throw new Error('El correo ya está registrado.');

    const idNumberExists = await RegisterUserRepository.isIdNumberTaken(data.id_number);
    if (idNumberExists) throw new Error('El número de identificación ya está registrado.');

    // Hashear el PIN
    // Obtener últimos 4 dígitos del número de identificación
    if (!/^\d{4,}$/.test(data.id_number)) throw new Error('El número de identificación debe tener al menos 4 dígitos.');
    const lastFour = data.id_number.slice(-4);

    // Hashear el PIN
    const hashedPin = await bcrypt.hash(lastFour, 10);

    // Registrar usuario
    const result = await RegisterUserRepository.registerUser(data, hashedPin);
  }
}

export default RegisterUserService;