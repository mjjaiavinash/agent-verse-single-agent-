import { categorizerService } from '../services/categorizer.service.js';
import { Expense } from '../models/Expense.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryExpenses } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const analyzeExpense = async (req, res, next) => {
  try {
    const { expenseName, amount, description } = req.body;

    logger.info(`[Expense Categorizer] Processing request for "${expenseName}" ($${amount})`);

    // 1. Categorize using Groq AI
    const aiResult = await categorizerService.categorizeExpense({ expenseName, amount, description });

    const expensePayload = {
      expenseName,
      amount,
      description: description || '',
      category: aiResult.category,
      confidenceScore: aiResult.confidenceScore,
      reason: aiResult.reason,
      createdAt: new Date(),
    };

    let savedRecord = null;

    // 2. Persist to MongoDB if connected, otherwise fallback to in-memory store
    if (getDBStatus()) {
      try {
        savedRecord = await Expense.create(expensePayload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = {
        _id: 'mem_' + Date.now(),
        ...expensePayload,
      };
      inMemoryExpenses.unshift(savedRecord);
    }

    // 3. Return exact JSON format requested
    return res.status(200).json({
      agent: "Expense Categorizer",
      status: "success",
      result: {
        id: savedRecord._id,
        expenseName: savedRecord.expenseName,
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
        history = await Expense.find().sort({ createdAt: -1 }).limit(50);
      } catch (dbErr) {
        logger.warn(`Database query error: ${dbErr.message}. Returning in-memory history.`);
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
