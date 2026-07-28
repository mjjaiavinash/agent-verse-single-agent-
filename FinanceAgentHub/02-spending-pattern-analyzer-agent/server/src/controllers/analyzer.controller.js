import { spendingPatternAnalyzerAgent } from '../agents/SpendingPatternAnalyzerAgent.js';
import { SpendingAnalysis } from '../models/SpendingAnalysis.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryAnalyses } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const analyzeSpendingPatterns = async (req, res, next) => {
  try {
    const { monthlyIncome, totalExpenses, transactions } = req.body;

    logger.info(`[Pattern Analyzer Controller] Delegating analysis to SpendingPatternAnalyzerAgent`);

    const agentResult = await spendingPatternAnalyzerAgent.execute({ monthlyIncome, totalExpenses, transactions });

    const payload = {
      monthlyIncome,
      totalExpenses,
      topCategories: agentResult.topCategories,
      weeklyTrends: agentResult.weeklyTrends,
      monthlyTrends: agentResult.monthlyTrends,
      aiInsights: agentResult.aiInsights,
      createdAt: new Date(),
    };

    let savedRecord = null;
    if (getDBStatus()) {
      try {
        savedRecord = await SpendingAnalysis.create(payload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = { _id: 'mem_' + Date.now(), ...payload };
      inMemoryAnalyses.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Spending Pattern Analyzer",
      status: "success",
      result: {
        id: savedRecord._id,
        topCategories: savedRecord.topCategories,
        weeklyTrends: savedRecord.weeklyTrends,
        monthlyTrends: savedRecord.monthlyTrends,
        aiInsights: savedRecord.aiInsights,
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
        history = await SpendingAnalysis.find().sort({ createdAt: -1 }).limit(20);
      } catch (dbErr) {
        history = inMemoryAnalyses;
      }
    } else {
      history = inMemoryAnalyses;
    }

    return res.status(200).json({
      agent: "Spending Pattern Analyzer",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};

export const analyzeSpending = analyzeSpendingPatterns;
