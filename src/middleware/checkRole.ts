// src/middleware/auth/checkRole.ts
import { Request, Response, NextFunction } from "express";

const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userRole = req.user?.rol;

        if (!userRole || !roles.includes(userRole)) {
            res.status(403).json({ error: "No tienes permisos para realizar esta acción" });
            return;
        }

        next();
    };
};

export default checkRole;
