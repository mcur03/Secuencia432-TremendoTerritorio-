// src/middleware/auth/verifyToken.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
    id: number;
    cedula: string;
    rol: string;
    iat: number;
    exp: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authorization = req.get('Authorization');
    
    if (!authorization) {
        res.status(401).json({ error: "Token no proporcionado" });
        return;
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: "Token inválido" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded; // Guardamos los datos del token en `req.user`
        next();
    } catch (error) {
        res.status(403).json({ error: "Token no válido o expirado" });
    }
};

export default verifyToken;
