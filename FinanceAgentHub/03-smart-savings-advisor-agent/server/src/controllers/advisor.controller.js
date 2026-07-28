import { advisorService } from '../services/advisor.service.js';
import { SavingsAdvice } from '../models/SavingsAdvice.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryAdvice } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const generateAdvice = async (req, res, next) => {
  try {
    const { monthlyIncome, monthlyExpenses } = req.body;

    logger.info(`[Smart Savings Advisor] Generating advice for Income: $${monthlyIncome}, Expenses: $${monthlyExpenses}`);

    const adviceOutput = await advisorService.generateAdvice({ monthlyIncome, monthlyExpenses });

    const payload = {
      monthlyIncome,
      monthlyExpenses,
      currentSavingsRate: adviceOutput.currentSavingsRate,
      estimatedMonthlySavings: adviceOutput.estimatedMonthlySavings,
      estimatedAnnualSavings: adviceOutput.estimatedAnnualSavings,
      savingsTips: adviceOutput.savingsTips,
      recommendations: adviceOutput.recommendations,
      warnings: adviceOutput.warnings,
      createdAt: new Date(),
    };

    let savedRecord = null;

    if (getDBStatus()) {
      try {
        savedRecord = await SavingsAdvice.create(payload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = {
        _id: 'mem_savings_' + Date.now(),
        ...payload,
      };
      inMemoryAdvice.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Smart Savings Advisor",
      status: "success",
      result: {
        id: savedRecord._id,
        monthlyIncome: savedRecord.monthlyIncome,
        monthlyExpenses: savedRecord.monthlyExpenses,
        currentSavingsRate: savedRecord.currentSavingsRate,
        estimatedMonthlySavings: savedRecord.estimatedMonthlySavings,
        estimatedAnnualSavings: savedRecord.estimatedAnnualSavings,
        savingsTips: savedRecord.savingsTips,
        recommendations: savedRecord.recommendations,
        warnings: savedRecord.warnings,
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
        history = await SavingsAdvice.find().sort({ createdAt: -1 }).limit(20);
      } catch (dbErr) {
        history = inMemoryAdvice;
      }
    } else {
      history = inMemoryAdvice;
    }

    return res.status(200).json({
      agent: "Smart Savings Advisor",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};
