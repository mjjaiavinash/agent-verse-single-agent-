export const inMemoryAdvice = [
  {
    _id: 'mem_savings_1',
    monthlyIncome: 6000.00,
    monthlyExpenses: 4100.00,
    currentSavingsRate: 31.7,
    estimatedMonthlySavings: 950.00,
    estimatedAnnualSavings: 11400.00,
    savingsTips: [
      {
        title: "Optimize Digital Subscriptions",
        potentialSavings: 55.00,
        description: "Cancel unused streaming and SaaS subscriptions to instantly free up annual cash flow."
      },
      {
        title: "Dining Out Meal-Prep Pivot",
        potentialSavings: 240.00,
        description: "Replace mid-week restaurant lunches with meal preparation to reduce discretionary spend."
      },
      {
        title: "High-Yield Savings Transfer",
        potentialSavings: 120.00,
        description: "Move emergency fund liquidity from traditional checking to a 4.5% APY High-Yield Savings Account."
      }
    ],
    recommendations: [
      "Target a 35% savings rate baseline by trimming food & entertainment budgets by ₹200/month.",
      "Set up automated recurring transfers of ₹450 to your investment portfolio on payday."
    ],
    warnings: [
      "Total fixed obligations represent 68% of monthly income, limiting emergency buffer.",
      "Maintain at least ₹12,300 (3 months expenses) in liquid cash reserves."
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
