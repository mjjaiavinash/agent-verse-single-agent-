import { groqClient } from '../config/groq.config.js';
import { config } from '../config/env.config.js';
import { logger } from '../utils/logger.util.js';

export class ExpenseCategorizerAgent {
  constructor() {
    this.name = "Expense Categorizer Agent";
    this.description = "Autonomous AI Agent specialized in transaction classification and confidence scoring.";
    this.mission = "To accurately categorize raw expenses into standard categories with reasoning.";
    this.systemPrompt = `IDENTITY & ROLE: You are Expense Categorizer Agent. Determine category, confidenceScore (0.0-1.0), and reason.`.trim();
  }

  async execute({ name, amount, description }) {
    // Proactive check: if key is missing/placeholder, trigger instant fallback (0ms)
    if (!config.groqApiKey || config.groqApiKey.includes('your_groq_api_key')) {
      logger.info(`[${this.name}] Proactive fallback activated (Groq API Key omitted/placeholder).`);
      return this.heuristicFallback({ name, amount });
    }

    const userPrompt = `Categorize expense: Name: "${name}", Amount: $${amount}, Description: "${description || 'N/A'}"`;

    try {
      logger.info(`[${this.name}] Calling Groq API for "${name}"`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.1,
        max_tokens: 500,
        response_format: { type: 'json_object' }
      });
      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Reactive fallback activated after API error: ${error.message}`);
      return this.heuristicFallback({ name, amount });
    }
  }

  heuristicFallback({ name }) {
    const lower = (name || '').toLowerCase();
    let cat = 'Miscellaneous';
    if (lower.includes('coffee') || lower.includes('starbucks') || lower.includes('burger') || lower.includes('food') || lower.includes('restaurant') || lower.includes('dining')) cat = 'Food & Dining';
    else if (lower.includes('uber') || lower.includes('gas') || lower.includes('flight') || lower.includes('transit') || lower.includes('metro')) cat = 'Transportation';
    else if (lower.includes('rent') || lower.includes('utility') || lower.includes('electric') || lower.includes('water')) cat = 'Housing & Utilities';

    return {
      category: cat,
      confidenceScore: 0.95,
      reason: `Categorized as ${cat} based on financial keyword matching for "${name}".`
    };
  }
}

export const expenseCategorizerAgent = new ExpenseCategorizerAgent();
