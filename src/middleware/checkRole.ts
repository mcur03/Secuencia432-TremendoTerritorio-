// src/middleware/auth/checkRole.ts
import { Request, Response, NextFunction } from "express";

const checkRole = (roles: string[], isOwnDataAllowed: boolean = false) => {
    return (req: Request, res: Response, next: NextFunction): void => {

        const user = (req as any).user; // aseguramos que exista
        if (!user) {
            res.status(401).json({ error: "No autorizado" });
            return;
        }

        const userRole = user.userRole;
        const userId = user.id_number;

        // 1. Validar si el rol del usuario está permitido
        if (!roles.includes(userRole)) {
            res.status(403).json({ error: "No tienes permisos para realizar esta acción" });
            return;
        }

        // 2. Si el usuario es administrador, puede acceder a todo
        if (userRole === "administrador") {
            return next();
        }

        // 3. Validar si puede acceder a sus propios datos (solo campesino, restaurante, usuariofinal)
        if (isOwnDataAllowed && ["campesino", "restaurante", "usuariofinal"].includes(userRole)) {
            const idUsuarioFromRequest = req.body.id_number || req.params.id_number;

            if (idUsuarioFromRequest && userId !== idUsuarioFromRequest) {
                res.status(403).json({ error: "No puedes acceder a los datos de otro usuario" });
                return;
            }
        }

        next();
    };
};

export default checkRole;












// // src/middleware/auth/checkRole.ts
// import { Request, Response, NextFunction } from "express";

// const checkRole = (roles: string[], isOwnDataAllowed: boolean = false) => {
//     return (req: Request, res: Response, next: NextFunction): void => {
//         console.log("Middleware checkRole ejecutado");

//         const userRole = req.body.userRole;
//         const userId = req.body.id_number;

//         // 1. Validar si el rol del usuario está permitido
//         if (!roles.includes(userRole)) {
//             res.status(403).json({ error: "No tienes permisos para realizar esta acción" });
//             return;
//         }

//         // 2. Validar si puede acceder a sus propios datos
//         if (isOwnDataAllowed && (userRole === "campesino" || userRole === "restaurante" || userRole === "usuariofinal")) {
//             const idUsuarioFromRequest = req.body.id_number || req.params.id_number;

//             if (idUsuarioFromRequest && userId !== idUsuarioFromRequest) {
//                 res.status(403).json({ error: "No puedes acceder a los datos de otro usuario" });
//                 return;
//             }
//         }

//         next();
//     };
// };

// export default checkRole;
