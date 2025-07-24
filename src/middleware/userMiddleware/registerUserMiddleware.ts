import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware de validación
const validateRequest: RequestHandler[] = [
    body('nombre')
        .notEmpty().withMessage('El campo username es obligatorio'),

    body('email')
        .notEmpty().withMessage('El campo email es obligatorio')
        .isEmail().withMessage('El campo email debe ser un email válido'),

    body('cedula')
        .notEmpty().withMessage('El campo cedula es obligatorio')
        .isLength({ min: 10, max: 10 }).withMessage('La cédula debe tener exactamente 10 caracteres'),

    body('rol')
        .notEmpty().withMessage('El campo rol es obligatorio'),

    body('selectedImageId')
        .notEmpty().withMessage('El campo selectedImageId es obligatorio'),

    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    },
];

export { validateRequest };