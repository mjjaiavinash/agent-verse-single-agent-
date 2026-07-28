export const inMemoryGoals = [
  {
    _id: 'mem_goal_1',
    goalName: 'Emergency Reserve Fund',
    targetAmount: 20000.00,
    currentSavings: 8500.00,
    monthlyContribution: 500.00,
    progressPercentage: 42.5,
    remainingAmount: 11500.00,
    monthsToCompletion: 23,
    completionDate: 'June 2028',
    milestones: [
      { milestone: '50% Target ($10,000)', targetDate: 'September 2026', status: 'Upcoming' },
      { milestone: '75% Target ($15,000)', targetDate: 'July 2027', status: 'Upcoming' },
      { milestone: '100% Target ($20,000)', targetDate: 'June 2028', status: 'Target Goal' }
    ],
    suggestions: [
      "Increasing monthly contribution by $150 ($650/mo) will accelerate completion by 6 months to December 2027.",
      "Direct tax refunds or annual bonuses directly to this goal to cross the 50% milestone by Q3.",
      "Hold funds in a high-yield savings account yielding 4.5% APY to generate ~$410 in compound interest."
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
