import mongoose from 'mongoose';

const budgetPlanSchema = new mongoose.Schema({
  monthlyIncome: {
    type: Number,
    required: true,
  },
  budgetRule: {
    type: String,
    default: '50/30/20',
  },
  budgetAllocation: {
    needs: { amount: Number, percentage: Number },
    wants: { amount: Number, percentage: Number },
    savings: { amount: Number, percentage: Number },
  },
  categoryBudgets: [
    {
      category: String,
      allocated: Number,
      percentage: Number,
    }
  ],
  spendingLimits: [
    {
      period: String,
      limit: Number,
    }
  ],
  recommendations: [
    { type: String }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const BudgetPlan = mongoose.models.BudgetPlan || mongoose.model('BudgetPlan', budgetPlanSchema);
