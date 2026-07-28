import { groqClient } from '../config/groq.config.js';
import { config } from '../config/env.config.js';
import { logger } from '../utils/logger.util.js';

export class AIFinancialReportAgent {
  constructor() {
    this.name = "AI Financial Report Agent";
    this.description = "Autonomous AI Agent specialized in synthesizing executive financial reports.";
    this.mission = "To generate monthly executive summaries and financial recommendations.";
  }

  async execute({ reportMonth, monthlyIncome, monthlyExpenses, fixedCosts }) {
    if (!config.groqApiKey || config.groqApiKey.includes('your_groq_api_key')) {
      logger.info(`[${this.name}] Proactive fallback activated (Groq API Key omitted/placeholder).`);
      return this.heuristicFallback({ reportMonth, monthlyIncome, monthlyExpenses, fixedCosts });
    }

    try {
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are AI Financial Report Agent. Return JSON.' },
          { role: 'user', content: `Period: "${reportMonth}", Income: $${monthlyIncome}, Expenses: $${monthlyExpenses}` }
        ],
        model: 'llama-3.1-8b-instant',
        response_format: { type: 'json_object' }
      });
      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Reactive fallback activated: ${error.message}`);
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
      incomeSummary: { totalIncome: monthlyIncome, sourcesCount: 2, primarySource: "Primary Salary & Inflows" },
      expenseSummary: { totalExpenses: monthlyExpenses, fixedExpenses: fixedCosts, discretionaryExpenses: discretionary, topCategory: "Housing & Operating Costs" },
      savingsSummary: { netSavings, savingsRate, monthsOfBuffer: Number((netSavings * 6 / monthlyExpenses).toFixed(1)) },
      recommendations: [
        `Reallocate $${Math.round(netSavings * 0.5)} of net surplus directly to long-term wealth investments.`,
        `Maintain fixed obligations below $${fixedCosts} to protect liquid surplus flow.`
      ]
    };
  }
}

export const aiFinancialReportAgent = new AIFinancialReportAgent();
