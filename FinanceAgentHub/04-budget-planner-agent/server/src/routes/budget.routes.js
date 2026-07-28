import { Router } from 'express';
import { generateBudgetPlan, getHistory } from '../controllers/budget.controller.js';
import { validateBudgetInput } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/analyze', validateBudgetInput, generateBudgetPlan);
router.get('/history', getHistory);

// API v1 aliases
router.post('/v1/analyze', validateBudgetInput, generateBudgetPlan);
router.get('/v1/history', getHistory);
router.post('/v1/task', validateBudgetInput, generateBudgetPlan);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "Budget Planner",
    status: "online",
    ports: { client: 3003, server: 5003 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
