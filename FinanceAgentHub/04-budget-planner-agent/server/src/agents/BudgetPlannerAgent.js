import { groqClient } from '../config/groq.config.js';
import { config } from '../config/env.config.js';
import { logger } from '../utils/logger.util.js';

export class BudgetPlannerAgent {
  constructor() {
    this.name = "Budget Planner Agent";
    this.description = "Autonomous AI Agent specialized in 50/30/20 category budget planning.";
    this.mission = "To generate 50/30/20 budget allocations and category spending limits.";
  }

  async execute({ monthlyIncome, monthlyExpenses }) {
    if (!config.groqApiKey || config.groqApiKey.includes('your_groq_api_key')) {
      logger.info(`[${this.name}] Proactive fallback activated (Groq API Key omitted/placeholder).`);
      return this.heuristicFallback({ monthlyIncome, monthlyExpenses });
    }

    try {
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are Budget Planner Agent. Return JSON.' },
          { role: 'user', content: `Income: $${monthlyIncome}, Expenses: $${monthlyExpenses}` }
        ],
        model: 'llama-3.1-8b-instant',
        response_format: { type: 'json_object' }
      });
      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Reactive fallback activated: ${error.message}`);
      return this.heuristicFallback({ monthlyIncome, monthlyExpenses });
    }
  }

  heuristicFallback({ monthlyIncome }) {
    const needs = Math.round(monthlyIncome * 0.50);
    const wants = Math.round(monthlyIncome * 0.30);
    const savings = Math.round(monthlyIncome * 0.20);

    return {
      budgetAllocation: {
        needs: { amount: needs, percentage: 50 },
        wants: { amount: wants, percentage: 30 },
        savings: { amount: savings, percentage: 20 }
      },
      categoryBudgets: [
        { category: "Housing & Utilities", allocatedAmount: Math.round(needs * 0.6), limit: Math.round(needs * 0.65) },
        { category: "Food & Dining", allocatedAmount: Math.round(wants * 0.5), limit: Math.round(wants * 0.55) },
        { category: "Transportation", allocatedAmount: Math.round(needs * 0.3), limit: Math.round(needs * 0.35) }
      ],
      recommendations: [
        `Cap fixed essential costs at $${needs}/mo (50% of earnings).`,
        `Direct at least $${savings}/mo (20%) directly into wealth accumulation.`
      ]
    };
  }
}

export const budgetPlannerAgent = new BudgetPlannerAgent();
