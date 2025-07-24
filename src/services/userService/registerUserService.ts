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

    // Validaciones
    const emailExists = await RegisterUserRepository.isEmailTaken(data.email);
    if (emailExists) throw new Error('El correo ya está registrado.');

    const cedulaExists = await RegisterUserRepository.isCedulaTaken(data.cedula);
    if (cedulaExists) throw new Error('La cédula ya está registrada.');

    // Hashear el PIN
    // Obtener últimos 4 dígitos de la cédula
    if (!/^\d{4,}$/.test(data.cedula)) throw new Error('La cédula debe tener al menos 4 dígitos.');
    const lastFour = data.cedula.slice(-4);

    // Hashear el PIN
    const hashedPin = await bcrypt.hash(lastFour, 10);

    // Registrar usuario
    const result = await RegisterUserRepository.registerUser(data, hashedPin);
  }
}

export default RegisterUserService;