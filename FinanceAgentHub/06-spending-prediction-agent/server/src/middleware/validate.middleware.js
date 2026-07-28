import { errorResponse } from '../utils/response.util.js';

export const validatePredictionInput = (req, res, next) => {
  let { income, monthlyIncome, recentAvg, recentMonthlyAvg } = req.body;

  const inc = Number(monthlyIncome || income || 5500);
  const avg = Number(recentMonthlyAvg || recentAvg || 4000);

  if (isNaN(inc) || inc <= 0) {
    return errorResponse(
      res,
      'Validation Error: "monthlyIncome" is required and must be a positive number.',
      400,
      'INVALID_INCOME'
    );
  }

  req.body.monthlyIncome = inc;
  req.body.recentMonthlyAvg = avg;

  next();
};
