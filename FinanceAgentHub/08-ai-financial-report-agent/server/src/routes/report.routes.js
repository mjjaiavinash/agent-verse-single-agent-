import { Router } from 'express';
import { generateReport, getHistory } from '../controllers/report.controller.js';
import { validateReportInput } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/analyze', validateReportInput, generateReport);
router.get('/history', getHistory);

// API v1 aliases
router.post('/v1/analyze', validateReportInput, generateReport);
router.get('/v1/history', getHistory);
router.post('/v1/task', validateReportInput, generateReport);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "AI Financial Report",
    status: "online",
    ports: { client: 3007, server: 5007 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
