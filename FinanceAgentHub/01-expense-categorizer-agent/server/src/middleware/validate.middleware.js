import { errorResponse } from '../utils/response.util.js';

export const validateExpenseInput = (req, res, next) => {
  const { expenseName, amount } = req.body;

  if (!expenseName || typeof expenseName !== 'string' || !expenseName.trim()) {
    return errorResponse(
      res,
      'Validation Error: "expenseName" is required and must be a non-empty string.',
      400,
      'INVALID_EXPENSE_NAME'
    );
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return errorResponse(
      res,
      'Validation Error: "amount" is required and must be a positive number greater than 0.',
      400,
      'INVALID_AMOUNT'
    );
  }

  req.body.expenseName = expenseName.trim();
  req.body.amount = numericAmount;
  req.body.description = (req.body.description || '').trim();

  next();
};
