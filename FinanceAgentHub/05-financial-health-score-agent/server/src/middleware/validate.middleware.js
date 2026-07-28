import { errorResponse } from '../utils/response.util.js';

export const validateHealthInput = (req, res, next) => {
  let { income, expenses, monthlyIncome, monthlyExpenses, totalDebt, totalSavings, totalInvestments } = req.body;

  const inc = Number(monthlyIncome || income);
  const exp = Number(monthlyExpenses || expenses);

  if (isNaN(inc) || inc <= 0) {
    return errorResponse(
      res,
      'Validation Error: "monthlyIncome" is required and must be a positive number.',
      400,
      'INVALID_INCOME'
    );
  }

  if (isNaN(exp) || exp < 0) {
    return errorResponse(
      res,
      'Validation Error: "monthlyExpenses" is required and must be a non-negative number.',
      400,
      'INVALID_EXPENSES'
    );
  }

  req.body.monthlyIncome = inc;
  req.body.monthlyExpenses = exp;
  req.body.totalDebt = Number(totalDebt || 0);
  req.body.totalSavings = Number(totalSavings || 0);
  req.body.totalInvestments = Number(totalInvestments || 0);

  next();
};
