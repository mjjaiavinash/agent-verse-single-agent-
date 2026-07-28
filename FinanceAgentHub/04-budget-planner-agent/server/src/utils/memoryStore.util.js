export const inMemoryBudgets = [
  {
    _id: 'mem_budget_1',
    monthlyIncome: 6000.00,
    budgetRule: '50/30/20 Rule',
    budgetAllocation: {
      needs: { amount: 3000.00, percentage: 50 },
      wants: { amount: 1800.00, percentage: 30 },
      savings: { amount: 1200.00, percentage: 20 },
    },
    categoryBudgets: [
      { category: 'Housing & Utilities', allocated: 1800.00, percentage: 30.0 },
      { category: 'Groceries & Household', allocated: 750.00, percentage: 12.5 },
      { category: 'Transportation & Auto', allocated: 450.00, percentage: 7.5 },
      { category: 'Dining out & Leisure', allocated: 600.00, percentage: 10.0 },
      { category: 'Shopping & Personal', allocated: 400.00, percentage: 6.7 },
      { category: 'Emergency & Investments', allocated: 1200.00, percentage: 20.0 },
      { category: 'Buffer & Subscriptions', allocated: 800.00, percentage: 13.3 },
    ],
    spendingLimits: [
      { period: 'Daily Discretionary Limit', limit: 45.00 },
      { period: 'Weekly Dining Limit', limit: 150.00 },
      { period: 'Monthly Shopping Ceiling', limit: 400.00 },
    ],
    recommendations: [
      "Cap Housing expenses at 30% ($1,800) to maintain high liquid flexibility.",
      "Automate a 20% ($1,200) direct deposit split between high-yield savings and index funds.",
      "Audit recurring streaming and SaaS subscriptions quarterly."
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
