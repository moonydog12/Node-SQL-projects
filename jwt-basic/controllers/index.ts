import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { BadRequestError } from '../errors';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // just for demo, normally provided by DB
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string!
  const token = jwt.sign({ username, id }, jwtSecret, {
    expiresIn: '1d',
  });

  res.status(200).json({ msg: 'User created', token });
}

async function dashboard(req: Request, res: Response) {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data,your secret number is ${luckyNumber}`,
  });
}

export { login, dashboard };
