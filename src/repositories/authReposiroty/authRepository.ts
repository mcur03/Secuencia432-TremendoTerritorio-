import db from '../../config/db';
import dotenv from 'dotenv';
import Images from '../../dto/authDto/Images';
import { RowDataPacket } from 'mysql2';

dotenv.config();

class AuthRepository {
    static async login() {

    }
    static async getAll() {
        const sql = `SELECT * FROM auth_images`;
        const [rows] = await db.query(sql);
        return rows as Images[];
    }
    static async findUserByUsername(username: string) {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
        return Array.isArray(rows) ? rows[0] : null;
    }

    static async getUserImageAndDistractors(selectedImageId: number) {
        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT id, cloudinary_url FROM auth_images WHERE id != ? AND is_active = 1 ORDER BY RAND() LIMIT 3',
            [selectedImageId]
        );
        return rows;
    }

    static async getImageById(id: number) {
        const [rows] = await db.query<RowDataPacket[]>('SELECT id, cloudinary_url FROM auth_images WHERE id = ?', [id]);
        return Array.isArray(rows) ? rows[0] : null;
    }

    static async incrementFailedAttempts(userId: number) {
        await db.query<RowDataPacket[]>(`
            UPDATE users 
            SET failed_login_attempts = failed_login_attempts + 1, 
                last_failed_login = NOW(), 
                locked_until = CASE 
                    WHEN failed_login_attempts + 1 >= 3 THEN DATE_ADD(NOW(), INTERVAL 15 MINUTE)
                    ELSE NULL END
            WHERE id = ?`, [userId]);
    }

    static async resetLoginAttempts(userId: number) {
        await db.query<RowDataPacket[]>(`
            UPDATE users SET failed_login_attempts = 0, locked_until = NULL WHERE id = ?
    `, [userId]);
    }
}

export default AuthRepository;

