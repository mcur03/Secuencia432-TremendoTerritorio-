import dotenv from 'dotenv';
import AuthRepository from '../../repositories/authReposiroty/authRepository';
import bcrypt from 'bcrypt';
import { StartLoginDto, CompleteLoginDto } from '../../dto/authDto/Auth';
import { generateToken } from '../../utils/jwt';

dotenv.config();

class AuthService {
    //ejemplo
    static async getAllImages() {
        return await AuthRepository.getAll();
    }

    static async startLogin(data: StartLoginDto) {

        const users = await AuthRepository.getAllUsers();

        let foundUser = null;
        for (const user of users) {
            const isMatch = await bcrypt.compare(data.pin, user.pin);
            if (isMatch) {
                foundUser = user;
                break;
            }
        }
        if (!foundUser) throw new Error('PIN incorrecto');

        const distractors = await AuthRepository.getUserImageAndDistractors(foundUser.selected_image_id);
        const realImage = await AuthRepository.getImageById(foundUser.selected_image_id);

        return {
            pin: data.pin,
            images: [...distractors, realImage].sort(() => Math.random() - 0.5),
        };
    }


    static async completeLogin(data: CompleteLoginDto) {
        const users = await AuthRepository.getAllUsers();

        let foundUser = null;
        for (const user of users) {
            const isMatch = await bcrypt.compare(data.pin, user.pin);
            if (isMatch) {
                foundUser = user;
                break;
            }
        }

        if (!foundUser) throw new Error('PIN incorrecto');

        const now = new Date();
        if (foundUser.locked_until && new Date(foundUser.locked_until) > now) {
            throw new Error('Usuario bloqueado temporalmente. Intenta más tarde.');
        }

        const isImageCorrect = foundUser.selected_image_id === Number(data.selectedImageId);
        const isPinCorrect = await bcrypt.compare(data.pin, foundUser.pin);

        if (isImageCorrect && isPinCorrect) {
            await AuthRepository.resetLoginAttempts(foundUser.id);
            return generateToken({ id: foundUser.id, username: foundUser.username });
        } else {
            await AuthRepository.incrementFailedAttempts(foundUser.id);
            throw new Error('PIN o imagen incorrecta');
        }
    }

}

export default AuthService;