import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class SpendingPredictionAgent {
  constructor() {
    this.name = "Spending Prediction Agent";
    this.description = "Autonomous AI Agent specialized in predictive temporal cash flow forecasting and risk scoring.";
    this.mission = "To predict next month spending, 3-month future trends, confidence meters, and financial risk profiles.";
    this.responsibilities = [
      "Evaluate historical cash flow averages.",
      "Predict next month outflow and confidence score.",
      "Calculate 3-month future trend trajectories.",
      "Identify seasonal liquidity risk factors."
    ];
    this.rules = ["Always return output strictly as a JSON object."];
    this.constraints = ["Adhere strictly to expected JSON structure."];
    this.systemPrompt = `
IDENTITY & ROLE:
You are the Spending Prediction Agent, an autonomous AI predictive temporal modeler.

MISSION:
Forecast next month spending, confidence score, expected savings, risk level, 3-month future trends, and risk factors.

EXPECTED JSON OUTPUT FORMAT:
{
  "predictedNextMonthSpending": 4120.00,
  "confidenceScore": 0.94,
  "expectedMonthlySavings": 1380.00,
  "expectedAnnualSavings": 16560.00,
  "financialRiskLevel": "Low",
  "futureTrends": [
    { "month": "Month +1", "projectedSpending": 4120, "projectedSavings": 1380, "trajectory": "Stable" }
  ],
  "riskFactors": [
    "Risk factor 1..."
  ]
}
`.trim();
  }

  async execute({ monthlyIncome, recentMonthlyAvg }) {
    const userPrompt = `Predict future spending:
Monthly Income: $${monthlyIncome}
Recent 3-Month Average Spend: $${recentMonthlyAvg}`;

    try {
      logger.info(`[${this.name}] Executing spending prediction`);
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
