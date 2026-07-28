import { groqClient } from '../config/groq.config.js';
import { config } from '../config/env.config.js';
import { logger } from '../utils/logger.util.js';

export class FinancialHealthScoreAgent {
  constructor() {
    this.name = "Financial Health Score Agent";
    this.description = "Autonomous AI Agent specialized in financial health scoring (0-100) and roadmaps.";
    this.mission = "To audit financial metrics and calculate a composite health score and grade.";
  }

  async execute({ monthlyIncome, monthlyExpenses, totalDebt, totalSavings, totalInvestments }) {
    if (!config.groqApiKey || config.groqApiKey.includes('your_groq_api_key')) {
      logger.info(`[${this.name}] Proactive fallback activated (Groq API Key omitted/placeholder).`);
      return this.heuristicFallback({ monthlyIncome, monthlyExpenses, totalDebt, totalSavings, totalInvestments });
    }

    try {
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are Financial Health Score Agent. Return JSON.' },
          { role: 'user', content: `Income: $${monthlyIncome}, Expenses: $${monthlyExpenses}, Debt: $${totalDebt}, Savings: $${totalSavings}` }
        ],
        model: 'llama3-8b-8192',
        response_format: { type: 'json_object' }
      });
      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Reactive fallback activated: ${error.message}`);
      return this.heuristicFallback({ monthlyIncome, monthlyExpenses, totalDebt, totalSavings, totalInvestments });
    }
  }

  heuristicFallback({ monthlyIncome, monthlyExpenses, totalDebt, totalSavings }) {
    const netSurplus = Math.max(0, monthlyIncome - monthlyExpenses);
    const savingsRatio = monthlyIncome > 0 ? (netSurplus / monthlyIncome) : 0;
    const debtRatio = monthlyIncome > 0 ? (totalDebt / (monthlyIncome * 12)) : 0;

    let score = 75;
    if (savingsRatio > 0.25) score += 10;
    if (debtRatio < 0.3) score += 10;
    score = Math.min(100, Math.max(0, score));

    return {
      score,
      grade: score >= 90 ? 'A+' : score >= 80 ? 'A' : 'B',
      riskLevel: score >= 80 ? 'Low' : 'Moderate',
      subScores: {
        liquidity: Math.round(score * 0.95),
        debtToIncome: Math.round(score * 0.9),
        savingsRate: Math.round(score * 1.02),
        investmentRatio: Math.round(score * 0.88)
      },
      strengths: [
        `Liquid savings cover ${(totalSavings / (monthlyExpenses || 1)).toFixed(1)} months of expenses.`,
        `Net savings rate of ${Math.round(savingsRatio * 100)}%.`
      ],
      weaknesses: [
        totalDebt > 0 ? `Outstanding debt balance of $${totalDebt} requires repayment schedule.` : 'Investment diversification can be optimized.'
      ],
      improvementPlan: [
        { step: 1, action: "Set up automated high-yield savings transfers.", timeframe: "30 Days" },
        { step: 2, action: "Build emergency reserve buffer to 6 months.", timeframe: "90 Days" },
        { step: 3, action: "Optimize low-cost index fund contributions.", timeframe: "180 Days" }
      ]
    };
  }
}

export const financialHealthScoreAgent = new FinancialHealthScoreAgent();
