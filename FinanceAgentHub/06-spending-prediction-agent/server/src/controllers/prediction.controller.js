import { spendingPredictionAgent } from '../agents/SpendingPredictionAgent.js';
import { SpendingPrediction } from '../models/SpendingPrediction.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryPredictions } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const generatePrediction = async (req, res, next) => {
  try {
    const { monthlyIncome, recentMonthlyAvg } = req.body;

    logger.info(`[Spending Prediction Controller] Delegating analysis to SpendingPredictionAgent`);

    const agentResult = await spendingPredictionAgent.execute({ monthlyIncome, recentMonthlyAvg });

    const payload = {
      monthlyIncome,
      recentMonthlyAvg,
      predictedNextMonthSpending: agentResult.predictedNextMonthSpending,
      confidenceScore: agentResult.confidenceScore,
      expectedMonthlySavings: agentResult.expectedMonthlySavings,
      expectedAnnualSavings: agentResult.expectedAnnualSavings,
      financialRiskLevel: agentResult.financialRiskLevel,
      futureTrends: agentResult.futureTrends,
      riskFactors: agentResult.riskFactors,
      createdAt: new Date(),
    };

    let savedRecord = null;
    if (getDBStatus()) {
      try {
        savedRecord = await SpendingPrediction.create(payload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = { _id: 'mem_' + Date.now(), ...payload };
      inMemoryPredictions.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Spending Prediction",
      status: "success",
      result: {
        id: savedRecord._id,
        predictedNextMonthSpending: savedRecord.predictedNextMonthSpending,
        confidenceScore: savedRecord.confidenceScore,
        expectedMonthlySavings: savedRecord.expectedMonthlySavings,
        expectedAnnualSavings: savedRecord.expectedAnnualSavings,
        financialRiskLevel: savedRecord.financialRiskLevel,
        futureTrends: savedRecord.futureTrends,
        riskFactors: savedRecord.riskFactors,
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
        history = await SpendingPrediction.find().sort({ createdAt: -1 }).limit(20);
      } catch (dbErr) {
        history = inMemoryPredictions;
      }
    } else {
      history = inMemoryPredictions;
    }

    return res.status(200).json({
      agent: "Spending Prediction",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};
