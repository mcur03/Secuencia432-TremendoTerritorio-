import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, param, validationResult } from "express-validator";

export const validateFarmUpdate: RequestHandler[] = [
  param("id")
    .notEmpty().withMessage("id es obligatorio")
    .isNumeric().withMessage("id debe ser un número entero"),

  body("farmName")
    .notEmpty().withMessage("farmName es obligatorio")
    .isLength({ min: 3, max: 150 }).withMessage("farmName debe tener entre 3 y 150 caracteres"),

  body("history")
    .optional()
    .isString().withMessage("history debe ser una cadena de texto"),

  body("location")
    .optional()
    .isString().withMessage("location debe ser una cadena de texto"),

  body("description")
    .optional()
    .isString().withMessage("description debe ser una cadena de texto"),

    (req: Request, res: Response, next: NextFunction): void => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            } else {
                next();
            }
        },
];
