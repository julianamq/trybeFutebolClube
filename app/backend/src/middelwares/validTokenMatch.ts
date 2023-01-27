import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secret: string = process.env.JWT_SECRET || 'minhaSenha';

export default (req: Request, res: Response, next: NextFunction) => {
  const validateToken = req.headers.authorization;

  if (!validateToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  try {
    const decoded = jwt.verify(validateToken, secret);
    req.body.decoded = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
