import mongoose from 'mongoose';

const savingsAdviceSchema = new mongoose.Schema({
  monthlyIncome: {
    type: Number,
    required: true,
  },
  monthlyExpenses: {
    type: Number,
    required: true,
  },
  currentSavingsRate: {
    type: Number,
    required: true,
  },
  estimatedMonthlySavings: {
    type: Number,
    required: true,
  },
  estimatedAnnualSavings: {
    type: Number,
    required: true,
  },
  savingsTips: [
    {
      title: String,
      potentialSavings: Number,
      description: String,
    }
  ],
  recommendations: [
    { type: String }
  ],
  warnings: [
    { type: String }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SavingsAdvice = mongoose.models.SavingsAdvice || mongoose.model('SavingsAdvice', savingsAdviceSchema);
