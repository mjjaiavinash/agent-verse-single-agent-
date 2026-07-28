import { financialHealthScoreAgent } from '../agents/FinancialHealthScoreAgent.js';
import { HealthScore } from '../models/HealthScore.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryHealthScores } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const calculateHealthScore = async (req, res, next) => {
  try {
    const { monthlyIncome, monthlyExpenses, totalDebt, totalSavings, totalInvestments } = req.body;

    logger.info(`[Health Score Controller] Delegating analysis to FinancialHealthScoreAgent`);

    const agentResult = await financialHealthScoreAgent.execute({
      monthlyIncome,
      monthlyExpenses,
      totalDebt,
      totalSavings,
      totalInvestments
    });

    const payload = {
      monthlyIncome,
      monthlyExpenses,
      totalDebt,
      totalSavings,
      totalInvestments,
      score: agentResult.score,
      grade: agentResult.grade,
      riskLevel: agentResult.riskLevel,
      subScores: agentResult.subScores,
      strengths: agentResult.strengths,
      weaknesses: agentResult.weaknesses,
      improvementPlan: agentResult.improvementPlan,
      createdAt: new Date(),
    };

    let savedRecord = null;
    if (getDBStatus()) {
      try {
        savedRecord = await HealthScore.create(payload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = { _id: 'mem_' + Date.now(), ...payload };
      inMemoryHealthScores.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Financial Health Score",
      status: "success",
      result: {
        id: savedRecord._id,
        score: savedRecord.score,
        grade: savedRecord.grade,
        riskLevel: savedRecord.riskLevel,
        subScores: savedRecord.subScores,
        strengths: savedRecord.strengths,
        weaknesses: savedRecord.weaknesses,
        improvementPlan: savedRecord.improvementPlan,
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
        history = await HealthScore.find().sort({ createdAt: -1 }).limit(20);
      } catch (dbErr) {
        history = inMemoryHealthScores;
      }
    } else {
      history = inMemoryHealthScores;
    }

    return res.status(200).json({
      agent: "Financial Health Score",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};
