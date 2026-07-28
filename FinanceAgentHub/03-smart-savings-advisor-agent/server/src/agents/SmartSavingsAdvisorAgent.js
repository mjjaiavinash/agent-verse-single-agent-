import { groqClient } from '../config/groq.config.js';
import { config } from '../config/env.config.js';
import { logger } from '../utils/logger.util.js';

export class SmartSavingsAdvisorAgent {
  constructor() {
    this.name = "Smart Savings Advisor Agent";
    this.description = "Autonomous AI Agent specialized in personal savings optimization.";
    this.mission = "To analyze surplus cash flow and formulate savings tips.";
  }

  async execute({ monthlyIncome, monthlyExpenses }) {
    if (!config.groqApiKey || config.groqApiKey.includes('your_groq_api_key')) {
      logger.info(`[${this.name}] Proactive fallback activated (Groq API Key omitted/placeholder).`);
      return this.heuristicFallback({ monthlyIncome, monthlyExpenses });
    }

    try {
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are Smart Savings Advisor Agent. Return JSON.' },
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

  heuristicFallback({ monthlyIncome, monthlyExpenses }) {
    const surplus = Math.max(0, monthlyIncome - monthlyExpenses);
    return {
      estimatedMonthlySavings: surplus,
      estimatedAnnualSavings: surplus * 12,
      savingsTips: [
        `Automate monthly transfers of $${Math.round(surplus * 0.5)} directly to a High-Yield Savings Account.`,
        'Review recurring digital subscriptions to trim unnecessary monthly leakage.'
      ],
      recommendations: [
        'Build a 6-month emergency reserve before increasing speculative investments.',
        'Optimize high-interest credit obligations.'
      ],
      financialWarnings: [
        monthlyExpenses / monthlyIncome > 0.85
          ? 'Warning: Operating expenses exceed 85% of total income.'
          : 'Maintain current budget discipline to preserve surplus cash flow.'
      ]
    };
  }
}

export const smartSavingsAdvisorAgent = new SmartSavingsAdvisorAgent();
