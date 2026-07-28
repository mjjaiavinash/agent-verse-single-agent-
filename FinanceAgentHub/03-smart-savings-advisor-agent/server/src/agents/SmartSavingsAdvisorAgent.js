import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class SmartSavingsAdvisorAgent {
  constructor() {
    this.name = "Smart Savings Advisor Agent";
    this.description = "Autonomous AI Agent specialized in personal savings optimization, opportunity identification, and risk warnings.";
    this.mission = "To analyze personal income vs expenses, calculate potential savings rate, and provide targeted financial recommendations.";
    this.responsibilities = [
      "Evaluate user income and expense totals.",
      "Calculate estimated monthly and annual savings capacity.",
      "Formulate 3 actionable savings tips.",
      "Highlight potential financial risk warnings."
    ];
    this.rules = [
      "Always return output strictly as a JSON object."
    ];
    this.constraints = [
      "Must adhere strictly to expected JSON structure."
    ];
    this.systemPrompt = `
IDENTITY & ROLE:
You are the Smart Savings Advisor Agent, an autonomous AI savings strategist.

MISSION:
Calculate net cash surplus, estimated savings, savings tips, and financial warnings.

EXPECTED JSON OUTPUT FORMAT:
{
  "estimatedMonthlySavings": 1200.00,
  "estimatedAnnualSavings": 14400.00,
  "savingsTips": [
    "Tip 1...",
    "Tip 2..."
  ],
  "recommendations": [
    "Rec 1...",
    "Rec 2..."
  ],
  "financialWarnings": [
    "Warning 1..."
  ]
}
`.trim();
  }

  async execute({ monthlyIncome, monthlyExpenses }) {
    const userPrompt = `Analyze savings capacity for:
Monthly Income: $${monthlyIncome}
Monthly Expenses: $${monthlyExpenses}`;

    try {
      logger.info(`[${this.name}] Executing savings advice generation`);
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
