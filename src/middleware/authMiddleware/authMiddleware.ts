import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware de validación
const validateRequest: RequestHandler[] = [
    body('username')
        .notEmpty().withMessage('El campo username es obligatorio'),

    body('selectedImageId')
        .notEmpty().withMessage('Debe seleccionar una imagen')
        .isNumeric().withMessage('El ID de la imagen debe ser numérico'),

    body('pin')
        .notEmpty().withMessage('El campo pin es obligatorio')
        .isLength({ min: 4 }).withMessage('El PIN debe tener al menos 4 caracteres'),

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