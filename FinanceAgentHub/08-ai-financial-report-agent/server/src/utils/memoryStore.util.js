export const inMemoryReports = [
  {
    _id: 'mem_report_1',
    reportMonth: 'July 2026',
    monthlyIncome: 7200.00,
    monthlyExpenses: 4500.00,
    executiveSummary: "During July 2026, total net cash inflow reached $7,200 against $4,500 in total operating expenses, resulting in a net monthly surplus of $2,700 (37.5% savings rate). Financial liquidity remains strong with healthy fixed-cost coverage.",
    incomeSummary: {
      totalIncome: 7200.00,
      sourcesCount: 2,
      primarySource: "Primary Salary ($6,500)",
    },
    expenseSummary: {
      totalExpenses: 4500.00,
      fixedExpenses: 2800.00,
      discretionaryExpenses: 1700.00,
      topCategory: "Housing & Utilities ($1,900)",
    },
    savingsSummary: {
      netSavings: 2700.00,
      savingsRate: 37.5,
      monthsOfBuffer: 4.8,
    },
    recommendations: [
      "Reallocate $1,000 of monthly net surplus to tax-advantaged retirement accounts.",
      "Cap discretionary dining and leisure spend at $1,200 to push savings rate past 40%."
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
