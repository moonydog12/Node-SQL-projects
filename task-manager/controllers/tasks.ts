import { Request, Response } from 'express'
import Task from '../sequelize/schemas/task.schema'

async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await Task.findAll()
    res.status(200).json({ tasks })
  } catch (error) {
    res.status(501).json({ msg: error })
  }
}

async function getTask(req: Request, res: Response) {
  const taskId = req.params.id
  try {
    const task = await Task.findOne({ where: { id: taskId } })
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(501).json({ msg: error })
  }
}

async function updateTask(req: Request, res: Response) {
  const taskId = req.params.id
  try {
    await Task.update({ ...req.body }, { where: { id: taskId } })
    const task = await Task.findOne({ where: { id: taskId } })
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` })
    }
    res.status(200).json({ task, data: req.body })
  } catch (error) {
    res.status(501).json({ msg: error })
  }
}

async function createTask(req: Request, res: Response) {
  try {
    const task = await Task.create(req.body)
    res.status(200).json({
      task,
      msg: 'Successfully create a new task',
    })
  } catch (error) {
    res.status(500).json({
      msg: error,
    })
  }
}

async function deleteTask(req: Request, res: Response) {
  const taskId = req.params.id
  try {
    const task = await Task.destroy({ where: { id: taskId } })
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskId}` })
    }
    res.status(200).json({
      task,
      msg: 'Successfully delete the task',
    })
  } catch (error) {
    res.status(500).json({
      msg: error,
    })
  }
}

export { getAllTasks, getTask, updateTask, createTask, deleteTask }
