import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'default_secret';

export interface JwtPayload {
  id: number;
  id_number: string;
  userRole: 'campesino' | 'restaurante' | 'usuariofinal' | 'administrador';
}

export function generateToken(user: JwtPayload) {
  const payload = {
    id: user.id,
    id_number: user.id_number,
    userRole: user.userRole
  };


  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}
