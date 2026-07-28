export const inMemoryAnalyses = [
  {
    _id: 'mem_pattern_1',
    timeframe: 'Monthly',
    totalSpent: 3840.50,
    topCategories: [
      { category: 'Housing & Rent', amount: 1450.00, percentage: 37.8 },
      { category: 'Food & Dining', amount: 1120.25, percentage: 29.2 },
      { category: 'Shopping & Retail', amount: 640.00, percentage: 16.7 },
      { category: 'Transportation', amount: 380.25, percentage: 9.9 },
      { category: 'Subscriptions & Utilities', amount: 250.00, percentage: 6.5 },
    ],
    weeklyTrends: [
      { week: 'Week 1', amount: 1020.00 },
      { week: 'Week 2', amount: 890.50 },
      { week: 'Week 3', amount: 1240.00 },
      { week: 'Week 4', amount: 690.00 },
    ],
    spendingHeatmap: [
      { day: 'Mon', intensity: 2 },
      { day: 'Tue', intensity: 2 },
      { day: 'Wed', intensity: 3 },
      { day: 'Thu', intensity: 1 },
      { day: 'Fri', intensity: 5 },
      { day: 'Sat', intensity: 5 },
      { day: 'Sun', intensity: 3 },
    ],
    aiInsights: [
      "Weekend spending (Friday & Saturday) constitutes 42% of discretionary outlays.",
      "Food & Dining expenditure experienced a 14% spike during Week 3.",
      "Recommendation: Establish a Friday dining budget limit of $150 to preserve ~$400/month."
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
