import { Router } from 'express';
import { calculateHealthScore, getHistory } from '../controllers/health.controller.js';
import { validateHealthInput } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/analyze', validateHealthInput, calculateHealthScore);
router.get('/history', getHistory);

// API v1 aliases
router.post('/v1/analyze', validateHealthInput, calculateHealthScore);
router.get('/v1/history', getHistory);
router.post('/v1/task', validateHealthInput, calculateHealthScore);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "Financial Health Score",
    status: "online",
    ports: { client: 3004, server: 5004 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
