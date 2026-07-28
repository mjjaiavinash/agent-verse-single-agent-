import { Router } from 'express';
import { orchestrateRequest, checkAgentHealth, getHistory } from '../controllers/orchestrator.controller.js';
import { validateOrchestratorInput } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/orchestrate', validateOrchestratorInput, orchestrateRequest);
router.post('/analyze', validateOrchestratorInput, orchestrateRequest);
router.get('/agents-status', checkAgentHealth);
router.get('/history', getHistory);

// API v1 aliases
router.post('/v1/orchestrate', validateOrchestratorInput, orchestrateRequest);
router.get('/v1/agents-status', checkAgentHealth);
router.get('/v1/history', getHistory);
router.post('/v1/task', validateOrchestratorInput, orchestrateRequest);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "Orchestrator Agent",
    status: "online",
    ports: { client: 3009, server: 5009 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
