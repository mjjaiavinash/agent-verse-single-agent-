import { Router } from 'express';
import { generateAdvice, getHistory } from '../controllers/advisor.controller.js';
import { validateSavingsInput } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/analyze', validateSavingsInput, generateAdvice);
router.get('/history', getHistory);

// API v1 aliases
router.post('/v1/analyze', validateSavingsInput, generateAdvice);
router.get('/v1/history', getHistory);
router.post('/v1/task', validateSavingsInput, generateAdvice);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "Smart Savings Advisor",
    status: "online",
    ports: { client: 3002, server: 5002 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
