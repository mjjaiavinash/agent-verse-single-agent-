import { Router } from 'express';
import { sendMessage, getChatHistory } from '../controllers/chat.controller.js';
import { validateChatInput } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/chat', validateChatInput, sendMessage);
router.post('/analyze', validateChatInput, sendMessage);
router.get('/history', getChatHistory);

// API v1 aliases
router.post('/v1/chat', validateChatInput, sendMessage);
router.get('/v1/history', getChatHistory);
router.post('/v1/task', validateChatInput, sendMessage);

router.get('/health', (req, res) => {
  res.status(200).json({
    agent: "Personal Finance Chat",
    status: "online",
    ports: { client: 3008, server: 5008 },
    timestamp: new Date().toISOString(),
  });
});

export default router;
