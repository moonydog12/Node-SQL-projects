import { NextFunction, Request, Response } from 'express'
import Task from '../sequelize/schemas/task.schema'
import { createCustomError } from '../errors/custom-error'

async function getAllTasks(req: Request, res: Response) {
  const tasks = await Task.findAll()
  res.status(200).json({ tasks })
}

async function getTask(req: Request, res: Response, next: NextFunction) {
  const taskId = req.params.id
  const task = await Task.findOne({ where: { id: taskId } })
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404))
  }
  res.status(200).json({ task })
}

async function updateTask(req: Request, res: Response, next: NextFunction) {
  const taskId = req.params.id
  await Task.update({ ...req.body }, { where: { id: taskId } })
  const task = await Task.findOne({ where: { id: taskId } })
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404))
  }
  res.status(200).json({ task, data: req.body })
}

async function createTask(req: Request, res: Response) {
  const task = await Task.create(req.body)
  res.status(200).json({
    task,
    msg: 'Successfully create a new task',
  })
}

async function deleteTask(req: Request, res: Response, next: NextFunction) {
  const taskId = req.params.id
  const task = await Task.destroy({ where: { id: taskId } })
  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404))
  }
  res.status(200).json({
    task,
    msg: 'Successfully delete the task',
  })
}

export { getAllTasks, getTask, updateTask, createTask, deleteTask }
