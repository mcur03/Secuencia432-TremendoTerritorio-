import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const hashPin = async (req: Request, res: Response): Promise<void> => {
  const { cedula } = req.body;

  if (!cedula || typeof cedula !== 'string' || !/^\d+$/.test(cedula)) {
    res.status(400).json({ error: 'Cédula inválida' });
    return;
  }

  if (cedula.length < 4) {
    res.status(400).json({ error: 'Cédula demasiado corta para generar PIN' });
    return;
  }

  const pin = cedula.slice(-4);

  const salt = await bcrypt.genSalt(10);
  const hashedPin = await bcrypt.hash(pin, salt);

  res.json({ hashedPin });
};

export default hashPin;
