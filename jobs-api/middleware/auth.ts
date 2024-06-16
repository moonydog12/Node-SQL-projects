import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UnauthenticatedError } from '../errors';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }
  const token = authHeader.split(' ')[1];

  try {
    const decodedData = jwt.verify(token, jwtSecret);
    const { id, username } = decodedData;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
}

export default authMiddleware;
