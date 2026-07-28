import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class BudgetPlannerAgent {
  constructor() {
    this.name = "Budget Planner Agent";
    this.description = "Autonomous AI Agent specialized in 50/30/20 category budget planning, allocation optimization, and spending caps.";
    this.mission = "To generate structured monthly budgets, category spending limits, and financial recommendations.";
    this.responsibilities = [
      "Evaluate monthly income and expense inputs.",
      "Calculate 50/30/20 budget allocations (Needs, Wants, Savings).",
      "Set spending caps per major expense category.",
      "Synthesize budget optimization recommendations."
    ];
    this.rules = ["Always return output strictly as a JSON object."];
    this.constraints = ["Adhere strictly to expected JSON structure."];
    this.systemPrompt = `
IDENTITY & ROLE:
You are the Budget Planner Agent, an autonomous AI budgeting strategist.

MISSION:
Calculate 50/30/20 budget allocations, category spending limits, and recommendations.

EXPECTED JSON OUTPUT FORMAT:
{
  "budgetAllocation": {
    "needs": { "amount": 2500, "percentage": 50 },
    "wants": { "amount": 1500, "percentage": 30 },
    "savings": { "amount": 1000, "percentage": 20 }
  },
  "categoryBudgets": [
    { "category": "Housing & Utilities", "allocatedAmount": 1500, "limit": 1600 },
    { "category": "Food & Dining", "allocatedAmount": 600, "limit": 650 }
  ],
  "recommendations": [
    "Recommendation 1...",
    "Recommendation 2..."
  ]
}
`.trim();
  }

  async execute({ monthlyIncome, monthlyExpenses }) {
    const userPrompt = `Generate 50/30/20 budget for:
Monthly Income: $${monthlyIncome}
Monthly Expenses: $${monthlyExpenses}`;

    try {
      logger.info(`[${this.name}] Executing budget allocation`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.2,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Groq API fallback executed: ${error.message}`);
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
