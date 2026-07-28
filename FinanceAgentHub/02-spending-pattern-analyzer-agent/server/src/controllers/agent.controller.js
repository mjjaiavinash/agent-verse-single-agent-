import { groqService } from '../services/groq.service.js';
import { successResponse } from '../utils/response.util.js';

export const getHealthStatus = async (req, res, next) => {
  try {
    return successResponse(res, {
      status: 'online',
      agent: 'Spending Pattern Analyzer Agent',
      clientPort: 3002,
      serverPort: 5002,
    }, 'Agent Health Check Passed');
  } catch (error) {
    next(error);
  }
};

export const handleTask = async (req, res, next) => {
  try {
    const { prompt, temperature, maxTokens } = req.body;
    const systemPrompt = `You are ${'Spending Pattern Analyzer Agent'}, an independent AI financial agent.`;
    
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
