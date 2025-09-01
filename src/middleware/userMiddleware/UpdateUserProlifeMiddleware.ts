import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from "express-validator";

export const validateUserProfileUpdate: RequestHandler[] = [
    body("first_name")
        .notEmpty().withMessage("first_name es obligatorio")
        .isLength({ min: 3, max: 150 }).withMessage("first_name debe tener entre 3 y 150 caracteres"),

    body("last_name")
        .notEmpty().withMessage("last_name es obligatorio")
        .isLength({ min: 3, max: 150 }).withMessage("last_name debe tener entre 3 y 150 caracteres"),

    body("email")
        .optional()
        .isEmail().withMessage("email debe ser un correo electrónico válido"),

    body("user_phone")
        .optional()
        .isString().withMessage("user_phone debe ser una cadena de texto"),

    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    },
];
