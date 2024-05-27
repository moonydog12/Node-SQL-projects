import { Router } from 'express'
import { getAllTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/tasks'
import asyncWrapper from '../middleware/asyncWrapper'

const router = Router()

router.route('/').get(asyncWrapper(getAllTasks)).post(asyncWrapper(createTask))
router
  .route('/:id')
  .get(asyncWrapper(getTask))
  .patch(asyncWrapper(updateTask))
  .delete(asyncWrapper(deleteTask))

export default router
