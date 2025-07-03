import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET || ' ';


export function generateToken(payload: any) {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}