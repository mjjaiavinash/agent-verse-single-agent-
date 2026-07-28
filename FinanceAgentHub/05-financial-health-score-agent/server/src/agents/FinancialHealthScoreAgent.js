import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class FinancialHealthScoreAgent {
  constructor() {
    this.name = "Financial Health Score Agent";
    this.description = "Autonomous AI Agent specialized in holistic financial health scoring, liquidity audit, risk grade assignment, and roadmaps.";
    this.mission = "To evaluate financial metrics (income, expenses, debt, savings, investments) and calculate a composite health score (0-100), letter grade, and 180-day roadmap.";
    this.responsibilities = [
      "Audit asset vs liability positions.",
      "Calculate composite score (0-100) and letter grade (A+, A, B, C, D, F).",
      "Evaluate risk exposure levels (Low, Moderate, High, Severe).",
      "Formulate a 30/90/180-day step-by-step improvement plan."
    ];
    this.rules = ["Always return output strictly as a JSON object."];
    this.constraints = ["Adhere strictly to expected JSON structure."];
    this.systemPrompt = `
IDENTITY & ROLE:
You are the Financial Health Score Agent, an autonomous AI financial auditor.

MISSION:
Calculate a score (0-100), letter grade, risk level, strengths, weaknesses, and improvement plan.

EXPECTED JSON OUTPUT FORMAT:
{
  "score": 84,
  "grade": "A",
  "riskLevel": "Low",
  "subScores": {
    "liquidity": 88,
    "debtToIncome": 80,
    "savingsRate": 85,
    "investmentRatio": 83
  },
  "strengths": [
    "Strength 1..."
  ],
  "weaknesses": [
    "Weakness 1..."
  ],
  "improvementPlan": [
    { "step": 1, "action": "Action 1", "timeframe": "30 Days" }
  ]
}
`.trim();
  }

  async execute({ monthlyIncome, monthlyExpenses, totalDebt, totalSavings, totalInvestments }) {
    const userPrompt = `Audit financial health metrics:
Monthly Income: $${monthlyIncome}
Monthly Expenses: $${monthlyExpenses}
Total Debt: $${totalDebt}
Total Savings: $${totalSavings}
Total Investments: $${totalInvestments}`;

    try {
      logger.info(`[${this.name}] Executing financial health scoring`);
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
    const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : 'C';

    return {
      score,
      grade,
      riskLevel: score >= 80 ? 'Low' : 'Moderate',
      subScores: {
        liquidity: Math.round(score * 0.95),
        debtToIncome: Math.round(score * 0.9),
        savingsRate: Math.round(score * 1.02),
        investmentRatio: Math.round(score * 0.88)
      },
      strengths: [
        `Liquid savings cover ${(totalSavings / (monthlyExpenses || 1)).toFixed(1)} months of living expenses.`,
        `Healthy net savings rate of ${Math.round(savingsRatio * 100)}%.`
      ],
      weaknesses: [
        totalDebt > 0 ? `Outstanding debt balance of $${totalDebt} requires repayment plan.` : 'Investment portfolio diversification can be optimized.'
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
