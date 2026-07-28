import { Router } from 'express';
import { analyzeGoal, getHistory } from '../controllers/goal.controller.js';
import { validateGoalInput } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/analyze', validateGoalInput, analyzeGoal);
router.get('/history', getHistory);

// API v1 aliases
router.post('/v1/analyze', validateGoalInput, analyzeGoal);
router.get('/v1/history', getHistory);
router.post('/v1/task', validateGoalInput, analyzeGoal);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "Savings Goal",
    status: "online",
    ports: { client: 3006, server: 5006 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
