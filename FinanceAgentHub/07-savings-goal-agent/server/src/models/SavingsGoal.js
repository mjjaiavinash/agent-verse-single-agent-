import mongoose from 'mongoose';

const savingsGoalSchema = new mongoose.Schema({
  goalName: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currentSavings: {
    type: Number,
    required: true,
  },
  monthlyContribution: {
    type: Number,
    required: true,
  },
  progressPercentage: {
    type: Number,
    required: true,
  },
  remainingAmount: {
    type: Number,
    required: true,
  },
  monthsToCompletion: Number,
  completionDate: String,
  milestones: [
    {
      milestone: String,
      targetDate: String,
      status: String,
    }
  ],
  suggestions: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SavingsGoal = mongoose.models.SavingsGoal || mongoose.model('SavingsGoal', savingsGoalSchema);
