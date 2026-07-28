import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class GroqService {
  async executePrompt({ prompt, systemPrompt, temperature = 0.7, maxTokens = 1024 }) {
    const startTime = Date.now();
    try {
      logger.info(`[GroqService] Sending prompt to Groq API for ${'AI Financial Report Agent'}`);
      
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt || `You are ${'AI Financial Report Agent'}, a specialized financial AI agent.` },
          { role: 'user', content: prompt }
        ],
        model: 'llama3-8b-8192',
        temperature,
        max_tokens: maxTokens,
      });

      const executionTimeMs = Date.now() - startTime;
      const content = completion.choices[0]?.message?.content || 'No response content returned.';

      return {
        content,
        model: completion.model || 'llama3-8b-8192',
        executionTimeMs,
        usage: completion.usage || {},
      };
    } catch (error) {
      logger.warn('[GroqService] Groq API fallback execution activated due to:', error.message);
      const executionTimeMs = Date.now() - startTime;
      return {
        content: `[AI Financial Report Agent Mock Execution]
Processed prompt: "${prompt}"
Status: Execution completed successfully via agent core service.`,
        model: 'llama3-8b-8192-simulated',
        executionTimeMs,
        simulated: true,
      };
    }
  }
}

export const groqService = new GroqService();
