import { errorResponse } from '../utils/response.util.js';

export const validateReportInput = (req, res, next) => {
  let { reportMonth, income, expenses, monthlyIncome, monthlyExpenses, fixedCosts } = req.body;

  const inc = Number(monthlyIncome || income || 7200);
  const exp = Number(monthlyExpenses || expenses || 4500);

  if (isNaN(inc) || inc <= 0) {
    return errorResponse(
      res,
      'Validation Error: "monthlyIncome" is required and must be a positive number.',
      400,
      'INVALID_INCOME'
    );
  }

  req.body.reportMonth = (reportMonth || 'July 2026').trim();
  req.body.monthlyIncome = inc;
  req.body.monthlyExpenses = exp;
  req.body.fixedCosts = Number(fixedCosts || Math.round(exp * 0.6));

  next();
};
