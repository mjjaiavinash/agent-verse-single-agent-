import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class HealthService {
  async calculateHealthScore({ monthlyIncome, monthlyExpenses, totalDebt = 0, totalSavings = 0, totalInvestments = 0 }) {
    const promptText = `Evaluate the following personal financial health profile:
Monthly Income: $${monthlyIncome}
Monthly Expenses: $${monthlyExpenses}
Total Debt: $${totalDebt}
Total Liquid Savings: $${totalSavings}
Total Investments: $${totalInvestments}

Calculate:
1. Overall Financial Score (0 to 100 integer)
2. Financial Grade (A+, A, B, C, D, or F)
3. Risk Level ("Low", "Moderate", "High", or "Severe")
4. Sub-scores (0-100) for liquidity, debtToIncome, savingsRate, investmentRatio
5. 3 key financial strengths
6. 2 financial weaknesses / risk areas
7. 3-step actionable improvement plan with timeframes

Respond STRICTLY with valid JSON matching this schema:
{
  "score": 84,
  "grade": "A",
  "riskLevel": "Low",
  "subScores": {
    "liquidity": 88,
    "debtToIncome": 80,
    "savingsRate": 85,
    "investmentRatio": 82
  },
  "strengths": [
    "Strength 1...",
    "Strength 2...",
    "Strength 3..."
  ],
  "weaknesses": [
    "Weakness 1...",
    "Weakness 2..."
  ],
  "improvementPlan": [
    { "step": 1, "action": "Action step 1...", "timeframe": "30 Days" },
    { "step": 2, "action": "Action step 2...", "timeframe": "90 Days" },
    { "step": 3, "action": "Action step 3...", "timeframe": "180 Days" }
  ]
}`;

    try {
      logger.info(`Calling Groq API for Financial Health Scoring ($${monthlyIncome} inc)`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Financial Health Score Agent, an expert AI credit risk & financial health analyst. You calculate composite health scores (0-100), financial grades, risk levels, sub-scores, strengths, weaknesses, and step-by-step roadmap plans. Output strict JSON.'
          },
          { role: 'user', content: promptText }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.2,
        max_tokens: 1200,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`Groq API health score fallback activated: ${error.message}`);
      return this.heuristicScore({ monthlyIncome, monthlyExpenses, totalDebt, totalSavings, totalInvestments });
    }
  }

  heuristicScore({ monthlyIncome, monthlyExpenses, totalDebt, totalSavings, totalInvestments }) {
    const netCash = Math.max(0, monthlyIncome - monthlyExpenses);
    const savingsRate = Math.min(100, Math.round((netCash / monthlyIncome) * 100));
    const monthsBuffer = monthlyExpenses > 0 ? Number((totalSavings / monthlyExpenses).toFixed(1)) : 6;
    
    let liquidityScore = Math.min(100, Math.round((monthsBuffer / 6) * 100));
    let debtScore = totalDebt === 0 ? 95 : Math.max(20, Math.round(100 - ((totalDebt / (monthlyIncome * 12)) * 100)));
    let savScore = Math.min(100, Math.round((savingsRate / 20) * 100));
    let invScore = Math.min(100, Math.round((totalInvestments / (monthlyIncome * 12)) * 100));

    const compositeScore = Math.round((liquidityScore * 0.3) + (debtScore * 0.3) + (savScore * 0.25) + (invScore * 0.15));

    let grade = 'C';
    let riskLevel = 'Moderate';
    if (compositeScore >= 90) { grade = 'A+'; riskLevel = 'Low'; }
    else if (compositeScore >= 80) { grade = 'A'; riskLevel = 'Low'; }
    else if (compositeScore >= 70) { grade = 'B'; riskLevel = 'Moderate'; }
    else if (compositeScore >= 55) { grade = 'C'; riskLevel = 'High'; }
    else { grade = 'D'; riskLevel = 'Severe'; }

    return {
      score: compositeScore,
      grade,
      riskLevel,
      subScores: {
        liquidity: liquidityScore,
        debtToIncome: debtScore,
        savingsRate: savScore,
        investmentRatio: invScore,
      },
      strengths: [
        `Liquid savings cover ${monthsBuffer} months of essential living expenses.`,
        `Monthly net savings rate of ${savingsRate}% demonstrates healthy cash flow control.`,
        'Active investment positioning creating long-term compound growth.'
      ],
      weaknesses: [
        `Total outstanding debt ($${totalDebt.toLocaleString()}) requires structured repayment.`,
        'Investment portfolio diversification can be optimized.'
      ],
      improvementPlan: [
        { step: 1, action: "Establish an automated high-yield debt acceleration schedule.", timeframe: "30 Days" },
        { step: 2, action: "Build liquid emergency buffer to 6 months of expenses.", timeframe: "90 Days" },
        { step: 3, action: "Set up bi-weekly low-cost index fund contributions.", timeframe: "180 Days" }
      ]
    };
  }
}

export const healthService = new HealthService();
