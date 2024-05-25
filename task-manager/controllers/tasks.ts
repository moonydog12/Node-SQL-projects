import { Request, Response } from 'express'

function getAllTasks(req: Request, res: Response) {
  res.send('Get all tasks')
}

function getTask(req: Request, res: Response) {
  res.send('Get single task')
}

function updateTask(req: Request, res: Response) {
  res.send('Update task')
}

function createTask(req: Request, res: Response) {
  console.log(req.body)
  res.json({
    msg: 'Successfully create a new task',
  })
}

function deleteTask(req: Request, res: Response) {
  res.send('Delete task')
}

export { getAllTasks, getTask, updateTask, createTask, deleteTask }
