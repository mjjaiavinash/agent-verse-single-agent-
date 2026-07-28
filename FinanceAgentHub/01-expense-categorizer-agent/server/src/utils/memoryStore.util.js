// In-memory fallback repository when MongoDB is not connected
export const inMemoryExpenses = [
  {
    _id: 'mem_1',
    expenseName: 'Starbucks Coffee',
    amount: 5.50,
    description: 'Morning mocha latte & croissant',
    category: 'Food & Dining',
    confidenceScore: 0.98,
    reason: 'Starbucks is a globally recognized beverage vendor. Morning pastry and coffee purchases fall under Food & Dining.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    _id: 'mem_2',
    expenseName: 'Uber Ride',
    amount: 24.80,
    description: 'Commute to downtown office',
    category: 'Transportation',
    confidenceScore: 0.96,
    reason: 'Uber rideshare services represent personal urban transit, categorizing as Transportation.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'mem_3',
    expenseName: 'Netflix Subscription',
    amount: 15.99,
    description: 'Monthly Premium 4K plan',
    category: 'Subscriptions & Software',
    confidenceScore: 0.99,
    reason: 'Netflix is a streaming entertainment subscription service.',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  }
];
