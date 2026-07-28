import { Router } from 'express';
import { analyzeExpense, getHistory } from '../controllers/categorizer.controller.js';
import { validateExpenseInput } from '../middleware/validate.middleware.js';

const router = Router();

// Primary specifications endpoints
router.post('/analyze', validateExpenseInput, analyzeExpense);
router.get('/history', getHistory);

// API v1 alias compatibility
router.post('/v1/analyze', validateExpenseInput, analyzeExpense);
router.get('/v1/history', getHistory);
router.post('/v1/task', validateExpenseInput, analyzeExpense);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "Expense Categorizer",
    status: "online",
    ports: { client: 3000, server: 5000 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
