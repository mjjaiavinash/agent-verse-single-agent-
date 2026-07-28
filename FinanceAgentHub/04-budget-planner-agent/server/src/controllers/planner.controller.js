import { budgetPlannerAgent } from '../agents/BudgetPlannerAgent.js';
import { BudgetPlan } from '../models/BudgetPlan.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryPlans } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const generateBudgetPlan = async (req, res, next) => {
  try {
    const { monthlyIncome, monthlyExpenses } = req.body;

    logger.info(`[Budget Planner Controller] Delegating analysis to BudgetPlannerAgent`);

    const agentResult = await budgetPlannerAgent.execute({ monthlyIncome, monthlyExpenses });

    const payload = {
      monthlyIncome,
      monthlyExpenses,
      budgetAllocation: agentResult.budgetAllocation,
      categoryBudgets: agentResult.categoryBudgets,
      recommendations: agentResult.recommendations,
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
      savedRecord = { _id: 'mem_' + Date.now(), ...payload };
      inMemoryPlans.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Budget Planner",
      status: "success",
      result: {
        id: savedRecord._id,
        budgetAllocation: savedRecord.budgetAllocation,
        categoryBudgets: savedRecord.categoryBudgets,
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
        history = inMemoryPlans;
      }
    } else {
      history = inMemoryPlans;
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
