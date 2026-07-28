import { goalService } from '../services/goal.service.js';
import { SavingsGoal } from '../models/SavingsGoal.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryGoals } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const analyzeGoal = async (req, res, next) => {
  try {
    const { goalName, targetAmount, currentSavings, monthlyContribution } = req.body;

    logger.info(`[Savings Goal Agent] Processing goal "${goalName}" (Target: $${targetAmount})`);

    const goalOutput = await goalService.analyzeGoal({
      goalName,
      targetAmount,
      currentSavings,
      monthlyContribution
    });

    const payload = {
      goalName,
      targetAmount,
      currentSavings,
      monthlyContribution,
      progressPercentage: goalOutput.progressPercentage,
      remainingAmount: goalOutput.remainingAmount,
      monthsToCompletion: goalOutput.monthsToCompletion,
      completionDate: goalOutput.completionDate,
      milestones: goalOutput.milestones,
      suggestions: goalOutput.suggestions,
      createdAt: new Date(),
    };

    let savedRecord = null;

    if (getDBStatus()) {
      try {
        savedRecord = await SavingsGoal.create(payload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = {
        _id: 'mem_goal_' + Date.now(),
        ...payload,
      };
      inMemoryGoals.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Savings Goal",
      status: "success",
      result: {
        id: savedRecord._id,
        goalName: savedRecord.goalName,
        targetAmount: savedRecord.targetAmount,
        currentSavings: savedRecord.currentSavings,
        monthlyContribution: savedRecord.monthlyContribution,
        progressPercentage: savedRecord.progressPercentage,
        remainingAmount: savedRecord.remainingAmount,
        monthsToCompletion: savedRecord.monthsToCompletion,
        completionDate: savedRecord.completionDate,
        milestones: savedRecord.milestones,
        suggestions: savedRecord.suggestions,
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
        history = await SavingsGoal.find().sort({ createdAt: -1 }).limit(20);
      } catch (dbErr) {
        history = inMemoryGoals;
      }
    } else {
      history = inMemoryGoals;
    }

    return res.status(200).json({
      agent: "Savings Goal",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};
