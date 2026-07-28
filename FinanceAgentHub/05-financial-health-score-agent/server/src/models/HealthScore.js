import mongoose from 'mongoose';

const healthScoreSchema = new mongoose.Schema({
  monthlyIncome: Number,
  monthlyExpenses: Number,
  totalDebt: Number,
  totalSavings: Number,
  totalInvestments: Number,
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B', 'C', 'D', 'F'],
    required: true,
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'High', 'Severe'],
    required: true,
  },
  subScores: {
    liquidity: Number,
    debtToIncome: Number,
    savingsRate: Number,
    investmentRatio: Number,
  },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  improvementPlan: [
    {
      step: Number,
      action: String,
      timeframe: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const HealthScore = mongoose.models.HealthScore || mongoose.model('HealthScore', healthScoreSchema);
