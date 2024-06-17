import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/User';
import { BadRequestError, UnauthenticatedError } from '../errors';

async function register(req: Request, res: Response) {
  const user = await UserModel.create({ ...req.body });
  const token = UserModel.generateToken(user);
  res.status(StatusCodes.CREATED).json({ token, user: { name: user.name } });
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await UserModel.findByEmail(email);

  // compare password
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordMatch = await UserModel.comparePassword(
    password,
    user.password,
  );

  if (!isPasswordMatch) {
    throw new UnauthenticatedError('Invalid Password');
  }

  const token = UserModel.generateToken(user);
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

export { register, login };
