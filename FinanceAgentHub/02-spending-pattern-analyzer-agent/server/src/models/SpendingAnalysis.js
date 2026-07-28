import mongoose from 'mongoose';

const spendingAnalysisSchema = new mongoose.Schema({
  timeframe: {
    type: String,
    enum: ['Weekly', 'Monthly', 'Quarterly'],
    default: 'Monthly',
  },
  totalSpent: {
    type: Number,
    required: true,
  },
  topCategories: [
    {
      category: String,
      amount: Number,
      percentage: Number,
    }
  ],
  weeklyTrends: [
    {
      week: String,
      amount: Number,
    }
  ],
  spendingHeatmap: [
    {
      day: String,
      intensity: Number,
    }
  ],
  aiInsights: [
    { type: String }
  ],
  rawInputSummary: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SpendingAnalysis = mongoose.models.SpendingAnalysis || mongoose.model('SpendingAnalysis', spendingAnalysisSchema);
