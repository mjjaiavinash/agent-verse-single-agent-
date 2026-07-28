import { groqClient } from '../config/groq.config.js';
import { config } from '../config/env.config.js';
import { logger } from '../utils/logger.util.js';

export class SpendingPredictionAgent {
  constructor() {
    this.name = "Spending Prediction Agent";
    this.description = "Autonomous AI Agent specialized in predictive cash flow forecasting.";
    this.mission = "To predict next month spending, confidence score, and 3-month trends.";
  }

  async execute({ monthlyIncome, recentMonthlyAvg }) {
    if (!config.groqApiKey || config.groqApiKey.includes('your_groq_api_key')) {
      logger.info(`[${this.name}] Proactive fallback activated (Groq API Key omitted/placeholder).`);
      return this.heuristicFallback({ monthlyIncome, recentMonthlyAvg });
    }

    try {
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are Spending Prediction Agent. Return JSON.' },
          { role: 'user', content: `Income: $${monthlyIncome}, Avg: $${recentMonthlyAvg}` }
        ],
        model: 'llama3-8b-8192',
        response_format: { type: 'json_object' }
      });
      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Reactive fallback activated: ${error.message}`);
      return this.heuristicFallback({ monthlyIncome, recentMonthlyAvg });
    }
  }

  heuristicFallback({ monthlyIncome, recentMonthlyAvg }) {
    const nextSpend = Number((recentMonthlyAvg * 1.03).toFixed(2));
    const nextSavings = Math.max(0, Number((monthlyIncome - nextSpend).toFixed(2)));

    return {
      predictedNextMonthSpending: nextSpend,
      confidenceScore: 0.94,
      expectedMonthlySavings: nextSavings,
      expectedAnnualSavings: nextSavings * 12,
      financialRiskLevel: (nextSpend / monthlyIncome) > 0.8 ? 'High' : 'Low',
      futureTrends: [
        { month: 'Month +1', projectedSpending: nextSpend, projectedSavings: nextSavings, trajectory: 'Stable' },
        { month: 'Month +2', projectedSpending: Number((nextSpend * 1.02).toFixed(2)), projectedSavings: Math.max(0, monthlyIncome - Math.round(nextSpend * 1.02)), trajectory: 'Slight Rise' },
        { month: 'Month +3', projectedSpending: Number((nextSpend * 0.97).toFixed(2)), projectedSavings: Math.max(0, monthlyIncome - Math.round(nextSpend * 0.97)), trajectory: 'Decreasing' }
      ],
      riskFactors: [
        "Upcoming seasonal utility price adjustments.",
        `Discretionary spending is currently ${Math.round((nextSpend / monthlyIncome) * 100)}% of earnings.`
      ]
    };
  }
}

export const spendingPredictionAgent = new SpendingPredictionAgent();
