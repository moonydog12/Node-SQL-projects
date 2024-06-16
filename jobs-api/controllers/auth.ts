import { Request, Response } from 'express';

async function register(req: Request, res: Response) {
  res.send('register user');
}

function login(req: Request, res: Response) {
  res.send('login user');
}

export { register, login };
