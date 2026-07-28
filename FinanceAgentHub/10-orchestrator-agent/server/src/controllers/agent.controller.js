import { groqService } from '../services/groq.service.js';
import { successResponse } from '../utils/response.util.js';

export const getHealthStatus = async (req, res, next) => {
  try {
    return successResponse(res, {
      status: 'online',
      agent: 'Orchestrator Agent',
      clientPort: 3010,
      serverPort: 5010,
    }, 'Agent Health Check Passed');
  } catch (error) {
    next(error);
  }
};

export const handleTask = async (req, res, next) => {
  try {
    const { prompt, temperature, maxTokens } = req.body;
    const systemPrompt = `You are ${'Orchestrator Agent'}, an independent AI financial agent.`;
    
    const result = await groqService.executePrompt({
      prompt,
      systemPrompt,
      temperature,
      maxTokens
    });

    return successResponse(res, result, 'Task processed successfully');
  } catch (error) {
    next(error);
  }
};
