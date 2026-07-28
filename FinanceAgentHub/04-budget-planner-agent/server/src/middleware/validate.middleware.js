import { errorResponse } from '../utils/response.util.js';

export const validateBudgetInput = (req, res, next) => {
  let { income, monthlyIncome, budgetRule } = req.body;

  const incomeVal = Number(monthlyIncome || income);

  if (isNaN(incomeVal) || incomeVal <= 0) {
    return errorResponse(
      res,
      'Validation Error: "monthlyIncome" is required and must be a positive number.',
      400,
      'INVALID_INCOME'
    );
  }

  req.body.monthlyIncome = incomeVal;
  req.body.budgetRule = budgetRule || '50/30/20 Rule';

  next();
};
