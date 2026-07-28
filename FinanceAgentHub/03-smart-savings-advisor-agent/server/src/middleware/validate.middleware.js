import { errorResponse } from '../utils/response.util.js';

export const validateSavingsInput = (req, res, next) => {
  let { income, expenses, monthlyIncome, monthlyExpenses } = req.body;

  const incomeVal = Number(monthlyIncome || income);
  const expenseVal = Number(monthlyExpenses || expenses);

  if (isNaN(incomeVal) || incomeVal <= 0) {
    return errorResponse(
      res,
      'Validation Error: "monthlyIncome" is required and must be a positive number.',
      400,
      'INVALID_INCOME'
    );
  }

  if (isNaN(expenseVal) || expenseVal < 0) {
    return errorResponse(
      res,
      'Validation Error: "monthlyExpenses" is required and must be a non-negative number.',
      400,
      'INVALID_EXPENSES'
    );
  }

  req.body.monthlyIncome = incomeVal;
  req.body.monthlyExpenses = expenseVal;

  next();
};
