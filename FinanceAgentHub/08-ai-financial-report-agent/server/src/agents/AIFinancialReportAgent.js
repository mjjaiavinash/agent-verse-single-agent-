import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class AIFinancialReportAgent {
  constructor() {
    this.name = "AI Financial Report Agent";
    this.description = "Autonomous AI Agent specialized in synthesizing formal monthly executive financial reports and recommendations.";
    this.mission = "To generate comprehensive monthly financial executive summaries, income/expense/savings breakdowns, and strategic recommendations.";
    this.responsibilities = [
      "Synthesize executive commentary on monthly cash flow performance.",
      "Summarize total income, primary revenue streams, and expense ratios.",
      "Formulate 2 strategic executive recommendations."
    ];
    this.rules = ["Always return output strictly as a JSON object."];
    this.constraints = ["Adhere strictly to expected JSON structure."];
    this.systemPrompt = `
IDENTITY & ROLE:
You are the AI Financial Report Agent, an autonomous AI executive financial analyst.

MISSION:
Synthesize an executive financial report for the given month.

EXPECTED JSON OUTPUT FORMAT:
{
  "reportMonth": "July 2026",
  "executiveSummary": "Executive summary narrative text...",
  "incomeSummary": {
    "totalIncome": 7200,
    "sourcesCount": 2,
    "primarySource": "Primary Salary"
  },
  "expenseSummary": {
    "totalExpenses": 4500,
    "fixedExpenses": 2800,
    "discretionaryExpenses": 1700,
    "topCategory": "Housing & Utilities"
  },
  "savingsSummary": {
    "netSavings": 2700,
    "savingsRate": 37.5,
    "monthsOfBuffer": 4.8
  },
  "recommendations": [
    "Recommendation 1...",
    "Recommendation 2..."
  ]
}
`.trim();
  }

  async execute({ reportMonth, monthlyIncome, monthlyExpenses, fixedCosts }) {
    const userPrompt = `Synthesize report for:
Report Month: "${reportMonth}"
Monthly Income: $${monthlyIncome}
Monthly Expenses: $${monthlyExpenses} (Fixed: $${fixedCosts})`;

    try {
      logger.info(`[${this.name}] Executing financial report synthesis for "${reportMonth}"`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.3,
        max_tokens: 1200,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Groq API fallback executed: ${error.message}`);
      return this.heuristicFallback({ reportMonth, monthlyIncome, monthlyExpenses, fixedCosts });
    }
  }

  heuristicFallback({ reportMonth, monthlyIncome, monthlyExpenses, fixedCosts }) {
    const netSavings = Math.max(0, monthlyIncome - monthlyExpenses);
    const savingsRate = Number(((netSavings / monthlyIncome) * 100).toFixed(1));
    const discretionary = Math.max(0, monthlyExpenses - fixedCosts);

    return {
      reportMonth,
      executiveSummary: `During ${reportMonth}, net cash inflows reached $${monthlyIncome.toLocaleString()} against $${monthlyExpenses.toLocaleString()} in operating expenses, generating a net surplus of $${netSavings.toLocaleString()} (${savingsRate}% savings rate).`,
      incomeSummary: {
        totalIncome: monthlyIncome,
        sourcesCount: 2,
        primarySource: "Primary Salary & Inflows",
      },
      expenseSummary: {
        totalExpenses: monthlyExpenses,
        fixedExpenses: fixedCosts,
        discretionaryExpenses: discretionary,
        topCategory: "Housing & Operating Costs",
      },
      savingsSummary: {
        netSavings,
        savingsRate,
        monthsOfBuffer: Number((netSavings * 6 / monthlyExpenses).toFixed(1)),
      },
      recommendations: [
        `Reallocate $${Math.round(netSavings * 0.5)} of net surplus directly to long-term wealth investments.`,
        `Maintain fixed obligations below $${fixedCosts} to protect liquid surplus flow.`
      ]
    };
  }
}

export const aiFinancialReportAgent = new AIFinancialReportAgent();
