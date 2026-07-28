import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class AdvisorService {
  async generateAdvice({ monthlyIncome, monthlyExpenses }) {
    const netIncome = Math.max(0, monthlyIncome - monthlyExpenses);
    const savingsRate = Number(((netIncome / monthlyIncome) * 100).toFixed(1));

    const promptText = `Analyze the following personal income & expense profile:
Monthly Income: $${monthlyIncome}
Monthly Expenses: $${monthlyExpenses}
Current Net Disposable Cash: $${netIncome} (Savings Rate: ${savingsRate}%)

Requirements:
Generate realistic estimated monthly & annual savings optimization, 3 high-impact actionable savings tips with estimated dollar values, 2 strategic AI financial recommendations, and 2 risk warnings if expense-to-income ratio exceeds standard baselines.

Respond STRICTLY with valid JSON matching this schema:
{
  "estimatedMonthlySavings": 850.00,
  "estimatedAnnualSavings": 10200.00,
  "savingsTips": [
    {
      "title": "Tip Title",
      "potentialSavings": 50.00,
      "description": "Actionable explanation..."
    }
  ],
  "recommendations": [
    "Recommendation 1...",
    "Recommendation 2..."
  ],
  "warnings": [
    "Warning 1...",
    "Warning 2..."
  ]
}`;

    try {
      logger.info(`Calling Groq API for Smart Savings Advice (Income: $${monthlyIncome}, Expenses: $${monthlyExpenses})`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Smart Savings Advisor Agent, an expert AI wealth management strategist. You analyze cash flows to deliver high-yield savings advice, risk warnings, and actionable cost-reduction strategies. Always output valid JSON.'
          },
          { role: 'user', content: promptText }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.3,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      });

      const parsed = JSON.parse(completion.choices[0]?.message?.content);
      return {
        ...parsed,
        currentSavingsRate: savingsRate,
      };
    } catch (error) {
      logger.warn(`Groq API advisor fallback activated: ${error.message}`);
      return this.heuristicAdvice({ monthlyIncome, monthlyExpenses, netIncome, savingsRate });
    }
  }

  heuristicAdvice({ monthlyIncome, monthlyExpenses, netIncome, savingsRate }) {
    const potentialMonthlySavings = Math.round(netIncome + (monthlyExpenses * 0.10));
    const potentialAnnualSavings = potentialMonthlySavings * 12;

    const warnings = [];
    if (monthlyExpenses / monthlyIncome > 0.8) {
      warnings.push(`Expense ratio is high (${Math.round((monthlyExpenses / monthlyIncome) * 100)}% of income). Consider urgent cost reduction.`);
    } else {
      warnings.push(`Maintain 3 to 6 months of living expenses ($${(monthlyExpenses * 3).toLocaleString()}) in a liquid high-yield account.`);
    }
    warnings.push('Ensure high-interest debt is prioritized over speculative investments.');

    return {
      currentSavingsRate: savingsRate,
      estimatedMonthlySavings: potentialMonthlySavings,
      estimatedAnnualSavings: potentialAnnualSavings,
      savingsTips: [
        {
          title: "Subscription Audit & Trimming",
          potentialSavings: 45.00,
          description: "Cancel unused digital streaming and recurring membership services."
        },
        {
          title: "Dining Out Cost Optimization",
          potentialSavings: 180.00,
          description: "Cap weekly restaurant orders to redirect cash into automated savings."
        },
        {
          title: "High-Yield Savings Yield Boost",
          potentialSavings: 95.00,
          description: "Move liquid reserves to a 4.5%+ APY account for risk-free passive growth."
        }
      ],
      recommendations: [
        `Automate a monthly deposit of $${Math.round(potentialMonthlySavings * 0.6)} directly into your emergency fund on payday.`,
        `Direct remaining monthly surplus ($${Math.round(potentialMonthlySavings * 0.4)}) into low-cost index funds.`
      ],
      warnings,
    };
  }
}

export const advisorService = new AdvisorService();
