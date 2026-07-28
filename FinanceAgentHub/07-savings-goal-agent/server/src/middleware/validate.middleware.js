import { errorResponse } from '../utils/response.util.js';

export const validateGoalInput = (req, res, next) => {
  let { goalName, targetAmount, currentSavings, monthlyContribution } = req.body;

  if (!goalName || typeof goalName !== 'string' || !goalName.trim()) {
    req.body.goalName = 'Emergency Savings Goal';
  } else {
    req.body.goalName = goalName.trim();
  }

  const target = Number(targetAmount);
  const current = Number(currentSavings || 0);
  const contrib = Number(monthlyContribution || 100);

  if (isNaN(target) || target <= 0) {
    return errorResponse(
      res,
      'Validation Error: "targetAmount" is required and must be a positive number.',
      400,
      'INVALID_TARGET_AMOUNT'
    );
  }

  req.body.targetAmount = target;
  req.body.currentSavings = current;
  req.body.monthlyContribution = contrib;

  next();
};
