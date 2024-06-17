import { Router } from 'express';
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobs';
import authMiddleware from '../middleware/auth';

const router = Router();

router.use(authMiddleware);
router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

export default router;
