import { Router } from 'express';
import { analyzeSpending, getHistory } from '../controllers/analyzer.controller.js';
import { validateAnalysisInput } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/analyze', validateAnalysisInput, analyzeSpending);
router.get('/history', getHistory);

// API v1 aliases
router.post('/v1/analyze', validateAnalysisInput, analyzeSpending);
router.get('/v1/history', getHistory);
router.post('/v1/task', validateAnalysisInput, analyzeSpending);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "Spending Pattern Analyzer",
    status: "online",
    ports: { client: 3001, server: 5001 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
