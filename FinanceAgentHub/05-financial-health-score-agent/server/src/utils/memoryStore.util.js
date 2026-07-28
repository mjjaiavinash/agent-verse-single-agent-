export const inMemoryHealthScores = [
  {
    _id: 'mem_health_1',
    monthlyIncome: 6500,
    monthlyExpenses: 4200,
    totalDebt: 12000,
    totalSavings: 18500,
    totalInvestments: 24000,
    score: 84,
    grade: 'A',
    riskLevel: 'Low',
    subScores: {
      liquidity: 88,
      debtToIncome: 80,
      savingsRate: 85,
      investmentRatio: 83,
    },
    strengths: [
      "Liquid emergency savings cover over 4.4 months of living expenses.",
      "Savings rate consistently exceeds the 25% target baseline.",
      "Solid investment portfolio allocation providing long-term compound growth."
    ],
    weaknesses: [
      "Debt-to-income ratio (35%) approaches caution thresholds.",
      "Monthly discretionary spend has mild volatility."
    ],
    improvementPlan: [
      { step: 1, action: "Accelerate high-interest debt payoff to reduce monthly interest drag.", timeframe: "30 Days" },
      { step: 2, action: "Increase liquid savings buffer from 4.4 to 6 months ($25,200).", timeframe: "90 Days" },
      { step: 3, action: "Automate bi-weekly index fund contributions.", timeframe: "180 Days" }
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
