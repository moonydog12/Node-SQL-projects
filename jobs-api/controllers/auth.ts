import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/User';

async function register(req: Request, res: Response) {
  const user = await UserModel.create({ ...req.body });
  const token = UserModel.generateToken(user);
  res.status(StatusCodes.CREATED).json({ token, user: { name: user.name } });
}

async function login(req: Request, res: Response) {
  res.send('login user');
}

export { register, login };
