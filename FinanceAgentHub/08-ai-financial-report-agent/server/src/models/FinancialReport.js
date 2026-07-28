import mongoose from 'mongoose';

const financialReportSchema = new mongoose.Schema({
  reportMonth: {
    type: String,
    required: true,
  },
  monthlyIncome: Number,
  monthlyExpenses: Number,
  executiveSummary: {
    type: String,
    required: true,
  },
  incomeSummary: {
    totalIncome: Number,
    sourcesCount: Number,
    primarySource: String,
  },
  expenseSummary: {
    totalExpenses: Number,
    fixedExpenses: Number,
    discretionaryExpenses: Number,
    topCategory: String,
  },
  savingsSummary: {
    netSavings: Number,
    savingsRate: Number,
    monthsOfBuffer: Number,
  },
  recommendations: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const FinancialReport = mongoose.models.FinancialReport || mongoose.model('FinancialReport', financialReportSchema);
