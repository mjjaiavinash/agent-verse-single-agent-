import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class ReportService {
  async generateReport({ reportMonth = 'Current Month', monthlyIncome = 7200, monthlyExpenses = 4500, fixedCosts = 2800 }) {
    const netSavings = Math.max(0, monthlyIncome - monthlyExpenses);
    const savingsRate = Number(((netSavings / monthlyIncome) * 100).toFixed(1));
    const discretionary = Math.max(0, monthlyExpenses - fixedCosts);

    const promptText = `Synthesize a monthly executive financial report for:
Reporting Period: ${reportMonth}
Monthly Income: $${monthlyIncome}
Monthly Expenses: $${monthlyExpenses} (Fixed: $${fixedCosts}, Discretionary: $${discretionary})
Net Savings: $${netSavings} (Savings Rate: ${savingsRate}%)

Requirements:
Write an executive summary commentary paragraph, compile Income Summary, Expense Summary, Savings Summary, and provide 2 strategic executive recommendations.

Respond STRICTLY with valid JSON matching this schema:
{
  "reportMonth": "${reportMonth}",
  "executiveSummary": "Executive summary narrative text...",
  "incomeSummary": {
    "totalIncome": ${monthlyIncome},
    "sourcesCount": 2,
    "primarySource": "Primary Salary"
  },
  "expenseSummary": {
    "totalExpenses": ${monthlyExpenses},
    "fixedExpenses": ${fixedCosts},
    "discretionaryExpenses": ${discretionary},
    "topCategory": "Housing & Utilities"
  },
  "savingsSummary": {
    "netSavings": ${netSavings},
    "savingsRate": ${savingsRate},
    "monthsOfBuffer": 4.8
  },
  "recommendations": [
    "Recommendation 1...",
    "Recommendation 2..."
  ]
}`;

    try {
      logger.info(`Calling Groq API for AI Financial Report (${reportMonth})`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are AI Financial Report Agent, an executive AI financial analyst. You synthesize comprehensive monthly financial reports, executive summaries, income/expense audits, and recommendations. Output strict JSON.'
          },
          { role: 'user', content: promptText }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.3,
        max_tokens: 1200,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`Groq API report service fallback activated: ${error.message}`);
      return this.heuristicReport({ reportMonth, monthlyIncome, monthlyExpenses, fixedCosts, netSavings, savingsRate, discretionary });
    }
  }

  heuristicReport({ reportMonth, monthlyIncome, monthlyExpenses, fixedCosts, netSavings, savingsRate, discretionary }) {
    return {
      reportMonth,
      executiveSummary: `During ${reportMonth}, net cash inflows reached $${monthlyIncome.toLocaleString()} against $${monthlyExpenses.toLocaleString()} in operating expenses, generating a net savings surplus of $${netSavings.toLocaleString()} (${savingsRate}% savings rate). Fixed costs represent ${Math.round((fixedCosts/monthlyIncome)*100)}% of total earnings.`,
      incomeSummary: {
        totalIncome: monthlyIncome,
        sourcesCount: 2,
        primarySource: "Primary Salary & Earnings",
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

export const reportService = new ReportService();
