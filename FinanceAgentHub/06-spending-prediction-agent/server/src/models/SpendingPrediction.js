import mongoose from 'mongoose';

const spendingPredictionSchema = new mongoose.Schema({
  monthlyIncome: Number,
  recentMonthlyAvg: Number,
  predictedNextMonthSpending: {
    type: Number,
    required: true,
  },
  confidenceScore: {
    type: Number,
    required: true,
  },
  expectedMonthlySavings: {
    type: Number,
    required: true,
  },
  expectedAnnualSavings: {
    type: Number,
    required: true,
  },
  financialRiskLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'High', 'Severe'],
    required: true,
  },
  futureTrends: [
    {
      month: String,
      projectedSpending: Number,
      projectedSavings: Number,
      trajectory: String,
    }
  ],
  riskFactors: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SpendingPrediction = mongoose.models.SpendingPrediction || mongoose.model('SpendingPrediction', spendingPredictionSchema);
