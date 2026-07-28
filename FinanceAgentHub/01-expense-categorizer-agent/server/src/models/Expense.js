import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: [true, 'Expense name is required'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Expense amount is required'],
    min: [0.01, 'Amount must be greater than zero'],
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  category: {
    type: String,
    required: true,
  },
  confidenceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
