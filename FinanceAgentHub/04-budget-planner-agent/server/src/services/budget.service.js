import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class BudgetService {
  async generateBudget({ monthlyIncome, budgetRule = '50/30/20' }) {
    const promptText = `Generate an intelligent monthly budget plan for:
Monthly Income: $${monthlyIncome}
Budget Strategy Rule: ${budgetRule}

Requirements:
Calculate 50/30/20 macro allocation (Needs, Wants, Savings), itemize 7 category budgets with allocated dollar amounts and percentage share, establish 3 spending limits (daily, weekly, monthly ceiling), and provide 3 actionable budget strategy recommendations.

Respond STRICTLY with valid JSON matching this schema:
{
  "budgetAllocation": {
    "needs": { "amount": 3000.00, "percentage": 50 },
    "wants": { "amount": 1800.00, "percentage": 30 },
    "savings": { "amount": 1200.00, "percentage": 20 }
  },
  "categoryBudgets": [
    { "category": "Housing & Utilities", "allocated": 1800.00, "percentage": 30.0 },
    { "category": "Groceries & Household", "allocated": 750.00, "percentage": 12.5 },
    { "category": "Transportation & Auto", "allocated": 450.00, "percentage": 7.5 },
    { "category": "Dining out & Leisure", "allocated": 600.00, "percentage": 10.0 },
    { "category": "Shopping & Personal", "allocated": 400.00, "percentage": 6.7 },
    { "category": "Emergency & Investments", "allocated": 1200.00, "percentage": 20.0 },
    { "category": "Buffer & Subscriptions", "allocated": 800.00, "percentage": 13.3 }
  ],
  "spendingLimits": [
    { "period": "Daily Discretionary Limit", "limit": 45.00 },
    { "period": "Weekly Dining Limit", "limit": 150.00 },
    { "period": "Monthly Shopping Ceiling", "limit": 400.00 }
  ],
  "recommendations": [
    "Recommendation 1...",
    "Recommendation 2...",
    "Recommendation 3..."
  ]
}`;

    try {
      logger.info(`Calling Groq API for Budget Planning ($${monthlyIncome})`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Budget Planner Agent, an expert AI financial planner. You calculate optimal budget distributions, category spending caps, daily/weekly limits, and executive financial strategy. Output strict JSON.'
          },
          { role: 'user', content: promptText }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.2,
        max_tokens: 1100,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`Groq API budget planner fallback activated: ${error.message}`);
      return this.heuristicBudget({ monthlyIncome, budgetRule });
    }
  }

  heuristicBudget({ monthlyIncome, budgetRule }) {
    const needsAmt = Number((monthlyIncome * 0.50).toFixed(2));
    const wantsAmt = Number((monthlyIncome * 0.30).toFixed(2));
    const savingsAmt = Number((monthlyIncome * 0.20).toFixed(2));

    return {
      budgetAllocation: {
        needs: { amount: needsAmt, percentage: 50 },
        wants: { amount: wantsAmt, percentage: 30 },
        savings: { amount: savingsAmt, percentage: 20 },
      },
      categoryBudgets: [
        { category: 'Housing & Utilities', allocated: Number((monthlyIncome * 0.30).toFixed(2)), percentage: 30.0 },
        { category: 'Groceries & Household', allocated: Number((monthlyIncome * 0.12).toFixed(2)), percentage: 12.0 },
        { category: 'Transportation & Auto', allocated: Number((monthlyIncome * 0.08).toFixed(2)), percentage: 8.0 },
        { category: 'Dining out & Leisure', allocated: Number((monthlyIncome * 0.15).toFixed(2)), percentage: 15.0 },
        { category: 'Shopping & Personal', allocated: Number((monthlyIncome * 0.15).toFixed(2)), percentage: 15.0 },
        { category: 'Emergency & Investments', allocated: Number((monthlyIncome * 0.15).toFixed(2)), percentage: 15.0 },
        { category: 'Buffer & Miscellaneous', allocated: Number((monthlyIncome * 0.05).toFixed(2)), percentage: 5.0 },
      ],
      spendingLimits: [
        { period: 'Daily Discretionary Limit', limit: Math.round(wantsAmt / 30) },
        { period: 'Weekly Dining Limit', limit: Math.round((monthlyIncome * 0.15) / 4) },
        { period: 'Monthly Shopping Ceiling', limit: Math.round(monthlyIncome * 0.15) },
      ],
      recommendations: [
        `Maintain fixed Housing & Utilities expenses under $${Number((monthlyIncome * 0.30).toFixed(0))}/month.`,
        `Automate a payday transfer of $${savingsAmt} directly to high-yield savings and low-cost index funds.`,
        `Use weekly discretionary spending caps of $${Math.round(wantsAmt / 4)} to prevent end-of-month budget deficit.`
      ]
    };
  }
}

export const budgetService = new BudgetService();
