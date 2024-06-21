import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import JobModel from '../models/Job';

async function getAllJobs(req: Request, res: Response) {
  const jobs = await JobModel.getAll();
  res.send({ jobs, count: jobs.length });
}

async function getJob(req: Request, res: Response) {
  res.send('get jobs');
}

async function createJob(req: Request, res: Response) {
  const userId = req.user.userId as string;
  const jobData = { ...req.body, userId };
  const result = await JobModel.create(jobData);
  res.status(StatusCodes.CREATED).json(result);
}

async function updateJob(req: Request, res: Response) {
  res.send('update jobs');
}

async function deleteJob(req: Request, res: Response) {
  res.send('delete jobs');
}

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
