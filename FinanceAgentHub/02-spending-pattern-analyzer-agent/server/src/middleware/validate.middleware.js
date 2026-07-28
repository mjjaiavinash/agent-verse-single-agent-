import { errorResponse } from '../utils/response.util.js';

export const validateAnalysisInput = (req, res, next) => {
  const { transactions } = req.body;

  if (!transactions) {
    // Provide default sample dataset if omitted
    req.body.transactions = [
      { expenseName: 'Starbucks Coffee', amount: 12.50, category: 'Food & Dining' },
      { expenseName: 'Whole Foods Market', amount: 145.00, category: 'Food & Dining' },
      { expenseName: 'Uber Commute', amount: 35.00, category: 'Transportation' },
      { expenseName: 'Monthly Apartment Rent', amount: 1400.00, category: 'Housing & Rent' },
      { expenseName: 'Amazon Electronics', amount: 210.00, category: 'Shopping & Retail' },
      { expenseName: 'Netflix & Spotify', amount: 28.00, category: 'Subscriptions & Software' },
    ];
  }

  next();
};
