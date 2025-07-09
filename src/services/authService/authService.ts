import dotenv from 'dotenv';
import AuthRepository from '../../repositories/authReposiroty/authRepository';
import bcrypt from 'bcrypt';
import { StartLoginDto, CompleteLoginDto } from '../../dto/authDto/Auth';
import { generateToken } from '../../utils/jwt';

dotenv.config();

class AuthService {
    static async getAllImages() {
        return await AuthRepository.getAll();
    }

    static async startLogin(data: StartLoginDto) {
        const user = await AuthRepository.findUserByUsername(data.username);
        if (!user) throw new Error('Usuario no encontrado');

        const distractors = await AuthRepository.getUserImageAndDistractors(user.selected_image_id);
        const realImage = await AuthRepository.getImageById(user.selected_image_id);

        return {
            username: user.username,
            images: [...distractors, realImage].sort(() => Math.random() - 0.5),
        };
    }

    static async completeLogin(data: CompleteLoginDto) {
        const user = await AuthRepository.findUserByUsername(data.username);
        console.log('Usuario encontrado:', user);
        if (!user) throw new Error('Usuario no encontrado');

        const now = new Date();
        if (user.locked_until && new Date(user.locked_until) > now) {
            throw new Error('Usuario bloqueado temporalmente. Intenta más tarde.');
        }

        console.log('Selected image (user):', user.selected_image_id);
        console.log('Selected image (input):', data.selectedImageId);
        console.log('PIN en BD:', user.pin);
        console.log('PIN ingresado:', data.pin);

        const isImageCorrect = user.selected_image_id === Number(data.selectedImageId);
        const isPinCorrect = await bcrypt.compare(String(data.pin).trim(), String(user.pin).trim());

        console.log('Imagen correcta?', isImageCorrect);
        console.log('PIN correcto?', isPinCorrect);

        if (isImageCorrect && isPinCorrect) {
            await AuthRepository.resetLoginAttempts(user.id);
            return generateToken({ id: user.id, username: user.username });
        } else {
            await AuthRepository.incrementFailedAttempts(user.id);
            throw new Error('PIN o imagen incorrecta');
        }
    }
}

export default AuthService;