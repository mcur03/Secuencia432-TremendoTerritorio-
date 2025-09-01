// src/middleware/auth/verifyToken.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
  id: number;
  id_number: string;
  userRole: string;
  iat: number;
  exp: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {

  const authorization = req.get('Authorization');
  if (!authorization) {
    res.status(401).json({ status: "token inválido o expirado" });
    return;
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    res.status(401).json({ status: 'No ha enviado un token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Guardamos los datos del usuario en req.user
    (req as any).user = {
      id: decoded.id,
      id_number: decoded.id_number,
      userRole: decoded.userRole
    };

    console.log('Datos del usuario extraídos del token:', (req as any).user);

    next();
  } catch (error) {
    res.status(403).json({
      status: 'No autorizado',
      error: (error as Error).message
    });
  }
};

export default verifyToken;











// // src/middleware/auth/verifyToken.ts
// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from "express";
// import dotenv from "dotenv";
// dotenv.config();

// interface JwtPayload {
//     id: number;
//     id_number: string;
//     userRole: string;
//     iat: number;
//     exp: number;
// }


// const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
//     console.log('ENTRO A VERIFICAR TOKEN');

//     let authorization = req.get('Authorization');
    
//     if (authorization) {
//         const token = authorization.split(' ')[1];
//         console.log('Token recibido:', token);

//         if (!token) {
//             res.status(401).json({
//                 status: 'No ha enviado un token'
//             });
//             return;
//         }

//         try {
//             console.log('Verificando token...');
//             const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
//             console.log('Token verificado con éxito:', decoded);
//             req.body.id = decoded.id;
//             req.body.id_number = decoded.id_number;
//             req.body.userRole = decoded.userRole;
//             console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111111');
            
//             console.log('Datos del usuario extraídos del token:', req.body);

//             next();
//         } catch (error) {
//             res.status(403).json({
//                 status: 'No autorizado',
//                 error: (error as Error).message
//             });
//             return;
//         }
//     } else {
//         res.status(401).json({
//             status: "token inválido o expirado"
//         });
//         return;
//     }
// };

// export default verifyToken;
