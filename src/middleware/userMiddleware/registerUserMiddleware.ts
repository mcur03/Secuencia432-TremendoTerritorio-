import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware de validación
const validateRequest: RequestHandler[] = [
    body('first_name')
        .notEmpty().withMessage('El campo first_name es obligatorio'),

    body('last_name')
        .notEmpty().withMessage('El campo last_name es obligatorio'),

    body('email')
        .notEmpty().withMessage('El campo email es obligatorio')
        .isEmail().withMessage('El campo email debe ser un email válido'),

    body('id_number')
        .notEmpty().withMessage('El campo id_number es obligatorio')
        .isLength({ min: 10, max: 10 }).withMessage('El id_number debe tener exactamente 10 caracteres'),

    body('user_phone')
        .notEmpty().withMessage('El campo user_phone es obligatorio')
        .isNumeric().withMessage('El user_phone solo debe contener números')
        .isLength({ min: 7, max: 15 }).withMessage('El user_phone debe tener minimo 7 y máximo 15 caracteres'),

    body('userRole')
        .notEmpty().withMessage('El campo userRole es obligatorio'),

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