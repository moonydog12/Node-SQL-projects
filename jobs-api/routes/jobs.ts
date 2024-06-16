import { Router } from 'express';
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobs';

const router = Router();

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

export default router;
