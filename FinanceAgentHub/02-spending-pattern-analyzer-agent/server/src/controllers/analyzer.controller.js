import { analyzerService } from '../services/analyzer.service.js';
import { SpendingAnalysis } from '../models/SpendingAnalysis.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryAnalyses } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const analyzeSpending = async (req, res, next) => {
  try {
    const { transactions, timeframe = 'Monthly' } = req.body;

    logger.info(`[Spending Pattern Analyzer] Analyzing ${transactions?.length || 0} transactions (${timeframe})`);

    const analysisOutput = await analyzerService.analyzePattern({ transactions, timeframe });

    const payload = {
      timeframe,
      totalSpent: analysisOutput.totalSpent,
      topCategories: analysisOutput.topCategories,
      weeklyTrends: analysisOutput.weeklyTrends,
      spendingHeatmap: analysisOutput.spendingHeatmap,
      aiInsights: analysisOutput.aiInsights,
      rawInputSummary: `Analyzed ${transactions?.length || 6} items.`,
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
      savedRecord = {
        _id: 'mem_pattern_' + Date.now(),
        ...payload,
      };
      inMemoryAnalyses.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Spending Pattern Analyzer",
      status: "success",
      result: {
        id: savedRecord._id,
        timeframe: savedRecord.timeframe,
        totalSpent: savedRecord.totalSpent,
        topCategories: savedRecord.topCategories,
        weeklyTrends: savedRecord.weeklyTrends,
        spendingHeatmap: savedRecord.spendingHeatmap,
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
