import { budgetService } from '../services/budget.service.js';
import { BudgetPlan } from '../models/BudgetPlan.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryBudgets } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const generateBudgetPlan = async (req, res, next) => {
  try {
    const { monthlyIncome, budgetRule } = req.body;

    logger.info(`[Budget Planner] Generating budget plan for Income: $${monthlyIncome}`);

    const budgetOutput = await budgetService.generateBudget({ monthlyIncome, budgetRule });

    const payload = {
      monthlyIncome,
      budgetRule: budgetRule || '50/30/20 Rule',
      budgetAllocation: budgetOutput.budgetAllocation,
      categoryBudgets: budgetOutput.categoryBudgets,
      spendingLimits: budgetOutput.spendingLimits,
      recommendations: budgetOutput.recommendations,
      createdAt: new Date(),
    };

    let savedRecord = null;

    if (getDBStatus()) {
      try {
        savedRecord = await BudgetPlan.create(payload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = {
        _id: 'mem_budget_' + Date.now(),
        ...payload,
      };
      inMemoryBudgets.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Budget Planner",
      status: "success",
      result: {
        id: savedRecord._id,
        monthlyIncome: savedRecord.monthlyIncome,
        budgetRule: savedRecord.budgetRule,
        budgetAllocation: savedRecord.budgetAllocation,
        categoryBudgets: savedRecord.categoryBudgets,
        spendingLimits: savedRecord.spendingLimits,
        recommendations: savedRecord.recommendations,
        createdAt: savedRecord.createdAt,
      }
    });

  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    let history = [];

    if (getDBStatus()) {
      try {
        history = await BudgetPlan.find().sort({ createdAt: -1 }).limit(20);
      } catch (dbErr) {
        history = inMemoryBudgets;
      }
    } else {
      history = inMemoryBudgets;
    }

    return res.status(200).json({
      agent: "Budget Planner",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};
