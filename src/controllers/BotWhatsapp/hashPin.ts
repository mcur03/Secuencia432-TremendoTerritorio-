import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const hashPin = async ( req: Request, res: Response): Promise<void> => {
    const { pin } = req.body;
  if (!pin){
    res.status(400).json({ error: 'PIN requerido' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPin = await bcrypt.hash(pin, salt);

  res.json({ hashedPin });
}

export default hashPin;