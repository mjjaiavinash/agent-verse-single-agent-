import { Router } from 'express';
import { getHealthStatus, handleTask } from '../controllers/agent.controller.js';
import { validateTaskPayload } from '../middleware/validate.middleware.js';

const router = Router();

router.get('/health', getHealthStatus);
router.post('/task', validateTaskPayload, handleTask);

export default router;
