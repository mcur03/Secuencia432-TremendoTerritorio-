import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'default_secret';

export interface JwtPayload {
  id: number;
  cedula: string;
  rol: 'campesino' | 'restaurante' | 'usuariofinal' | 'administrador';
}

export function generateToken(user: JwtPayload) {
  const payload = {
    id: user.id,
    cedula: user.cedula,
    rol: user.rol
  };


  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}
