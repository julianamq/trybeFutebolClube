import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { SignOptions } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { InterfaceToken } from '../interfaces/Interface';

dotenv.config();
const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const userValidate = req.body;
  if (!userValidate.email || !userValidate.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  return next();
};

const secret = process.env.JWT_SECRET || 'suaSenha';

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};
const createToken = (loginWithoutPassword: InterfaceToken) => {
  const token = jwt.sign({ data: loginWithoutPassword }, secret, jwtConfig);
  return token;
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization;
  jwt.verify(token as string, secret, (error, data) => {
    if (error) return res.status(400).json({ message: 'Token not found' });
    req.body.user = data;
    next();
  });
};

export const validateMatches = (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return { message: 'It is not possible to create a match with two equal teams' };
  }
  return next();
};
export { createToken, validateToken, validateLogin };
