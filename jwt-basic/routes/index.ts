import { Router } from 'express';
import { login, dashboard } from '../controllers';
import authMiddleware from '../middleware/auth';

const router = Router();

router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login);

export default router;
