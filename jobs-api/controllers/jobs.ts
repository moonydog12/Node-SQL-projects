import { Request, Response } from 'express';
import query from '../db';
import UserModel from '../models/User';

async function getAllJobs(req: Request, res: Response) {
  const user = await UserModel.findByEmail('losididog@gmail.com');
  res.send({ user });
}

async function getJob(req: Request, res: Response) {
  res.send('get jobs');
}

async function createJob(req: Request, res: Response) {
  res.send('create jobs');
}

async function updateJob(req: Request, res: Response) {
  res.send('update jobs');
}

async function deleteJob(req: Request, res: Response) {
  res.send('delete jobs');
}

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
