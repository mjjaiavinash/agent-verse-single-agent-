import { expenseCategorizerAgent } from '../agents/ExpenseCategorizerAgent.js';
import { Expense } from '../models/Expense.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryExpenses } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const analyzeExpense = async (req, res, next) => {
  try {
    const { name, amount, description } = req.body;

    logger.info(`[Expense Categorizer Controller] Delegating analysis to ExpenseCategorizerAgent`);

    // Execute Agent
    const agentResult = await expenseCategorizerAgent.execute({ name, amount, description });

    const payload = {
      name,
      amount,
      description: description || '',
      category: agentResult.category,
      confidenceScore: agentResult.confidenceScore,
      reason: agentResult.reason,
      createdAt: new Date(),
    };

    let savedRecord = null;
    if (getDBStatus()) {
      try {
        savedRecord = await Expense.create(payload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = { _id: 'mem_' + Date.now(), ...payload };
      inMemoryExpenses.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Expense Categorizer",
      status: "success",
      result: {
        id: savedRecord._id,
        name: savedRecord.name,
        amount: savedRecord.amount,
        description: savedRecord.description,
        category: savedRecord.category,
        confidenceScore: savedRecord.confidenceScore,
        reason: savedRecord.reason,
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
        history = await Expense.find().sort({ createdAt: -1 }).limit(20);
      } catch (dbErr) {
        history = inMemoryExpenses;
      }
    } else {
      history = inMemoryExpenses;
    }

    return res.status(200).json({
      agent: "Expense Categorizer",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};
