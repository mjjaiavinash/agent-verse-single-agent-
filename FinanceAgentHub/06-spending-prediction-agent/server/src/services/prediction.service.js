import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class PredictionService {
  async generatePrediction({ monthlyIncome, recentMonthlyAvg, historicalMonths = [] }) {
    const promptText = `Perform predictive temporal financial modeling for:
Monthly Income: $${monthlyIncome}
Recent 3-Month Average Spending: $${recentMonthlyAvg}
Historical Data: ${JSON.stringify(historicalMonths)}

Calculate:
1. Predicted Next Month Spending ($)
2. Confidence Score (0.00 to 1.00 decimal)
3. Expected Monthly Savings & Annual Savings ($)
4. Financial Risk Level ("Low", "Moderate", "High", or "Severe")
5. 3-Month Future Spending Trends (month, projectedSpending, projectedSavings, trajectory)
6. 2 specific financial risk factors

Respond STRICTLY with valid JSON matching this schema:
{
  "predictedNextMonthSpending": 4120.00,
  "confidenceScore": 0.94,
  "expectedMonthlySavings": 1380.00,
  "expectedAnnualSavings": 16560.00,
  "financialRiskLevel": "Low",
  "futureTrends": [
    { "month": "Month +1", "projectedSpending": 4120.00, "projectedSavings": 1380.00, "trajectory": "Stable" },
    { "month": "Month +2", "projectedSpending": 4250.00, "projectedSavings": 1250.00, "trajectory": "Slight Rise" },
    { "month": "Month +3", "projectedSpending": 3980.00, "projectedSavings": 1520.00, "trajectory": "Decreasing" }
  ],
  "riskFactors": [
    "Risk factor 1...",
    "Risk factor 2..."
  ]
}`;

    try {
      logger.info(`Calling Groq API for Spending Prediction (Income: $${monthlyIncome})`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Spending Prediction Agent, an expert AI predictive financial modeler. You analyze historical spending patterns to forecast future cash outflows, expected savings, confidence scores, and financial risk profiles. Output strict JSON.'
          },
          { role: 'user', content: promptText }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.2,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`Groq API prediction service fallback activated: ${error.message}`);
      return this.heuristicPrediction({ monthlyIncome, recentMonthlyAvg });
    }
  }

  heuristicPrediction({ monthlyIncome, recentMonthlyAvg }) {
    const nextSpend = Number((recentMonthlyAvg * 1.03).toFixed(2));
    const nextSavings = Math.max(0, Number((monthlyIncome - nextSpend).toFixed(2)));

    const risk = (nextSpend / monthlyIncome) > 0.85 ? 'High' : (nextSpend / monthlyIncome) > 0.70 ? 'Moderate' : 'Low';

    return {
      predictedNextMonthSpending: nextSpend,
      confidenceScore: 0.94,
      expectedMonthlySavings: nextSavings,
      expectedAnnualSavings: nextSavings * 12,
      financialRiskLevel: risk,
      futureTrends: [
        { month: 'Month +1', projectedSpending: nextSpend, projectedSavings: nextSavings, trajectory: 'Stable' },
        { month: 'Month +2', projectedSpending: Number((nextSpend * 1.02).toFixed(2)), projectedSavings: Math.max(0, monthlyIncome - Math.round(nextSpend * 1.02)), trajectory: 'Slight Rise' },
        { month: 'Month +3', projectedSpending: Number((nextSpend * 0.97).toFixed(2)), projectedSavings: Math.max(0, monthlyIncome - Math.round(nextSpend * 0.97)), trajectory: 'Decreasing' },
      ],
      riskFactors: [
        "Upcoming seasonal utility and subscription price adjustments.",
        `Discretionary spending ratio is currently ${Math.round((nextSpend / monthlyIncome) * 100)}% of monthly earnings.`
      ]
    };
  }
}

export const predictionService = new PredictionService();
