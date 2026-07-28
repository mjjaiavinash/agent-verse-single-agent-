import { aiFinancialReportAgent } from '../agents/AIFinancialReportAgent.js';
import { FinancialReport } from '../models/FinancialReport.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryReports } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const generateReport = async (req, res, next) => {
  try {
    const { reportMonth, monthlyIncome, monthlyExpenses, fixedCosts } = req.body;

    logger.info(`[AI Financial Report Controller] Delegating synthesis to AIFinancialReportAgent`);

    const agentResult = await aiFinancialReportAgent.execute({
      reportMonth,
      monthlyIncome,
      monthlyExpenses,
      fixedCosts
    });

    const payload = {
      reportMonth: agentResult.reportMonth || reportMonth,
      monthlyIncome,
      monthlyExpenses,
      executiveSummary: agentResult.executiveSummary,
      incomeSummary: agentResult.incomeSummary,
      expenseSummary: agentResult.expenseSummary,
      savingsSummary: agentResult.savingsSummary,
      recommendations: agentResult.recommendations,
      createdAt: new Date(),
    };

    let savedRecord = null;
    if (getDBStatus()) {
      try {
        savedRecord = await FinancialReport.create(payload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = { _id: 'mem_' + Date.now(), ...payload };
      inMemoryReports.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "AI Financial Report",
      status: "success",
      result: {
        id: savedRecord._id,
        reportMonth: savedRecord.reportMonth,
        executiveSummary: savedRecord.executiveSummary,
        incomeSummary: savedRecord.incomeSummary,
        expenseSummary: savedRecord.expenseSummary,
        savingsSummary: savedRecord.savingsSummary,
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
        history = await FinancialReport.find().sort({ createdAt: -1 }).limit(20);
      } catch (dbErr) {
        history = inMemoryReports;
      }
    } else {
      history = inMemoryReports;
    }

    return res.status(200).json({
      agent: "AI Financial Report",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};
