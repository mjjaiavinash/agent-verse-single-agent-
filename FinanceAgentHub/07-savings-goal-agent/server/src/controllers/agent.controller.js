import { groqService } from '../services/groq.service.js';
import { successResponse } from '../utils/response.util.js';

export const getHealthStatus = async (req, res, next) => {
  try {
    return successResponse(res, {
      status: 'online',
      agent: 'Savings Goal Agent',
      clientPort: 3007,
      serverPort: 5007,
    }, 'Agent Health Check Passed');
  } catch (error) {
    next(error);
  }
};

export const handleTask = async (req, res, next) => {
  try {
    const { prompt, temperature, maxTokens } = req.body;
    const systemPrompt = `You are ${'Savings Goal Agent'}, an independent AI financial agent.`;
    
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
