import { Router } from 'express';
import { generatePrediction, getHistory } from '../controllers/prediction.controller.js';
import { validatePredictionInput } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/analyze', validatePredictionInput, generatePrediction);
router.get('/history', getHistory);

// API v1 aliases
router.post('/v1/analyze', validatePredictionInput, generatePrediction);
router.get('/v1/history', getHistory);
router.post('/v1/task', validatePredictionInput, generatePrediction);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "Spending Prediction",
    status: "online",
    ports: { client: 3005, server: 5005 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
