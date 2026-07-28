import React, { useState, useEffect } from 'react';
import BudgetInputForm from '../components/BudgetInputForm.jsx';
import AllocationChart from '../components/AllocationChart.jsx';
import CategoryBudgets from '../components/CategoryBudgets.jsx';
import SpendingLimits from '../components/SpendingLimits.jsx';
import BudgetRecommendations from '../components/BudgetRecommendations.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleGenerateBudget = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analyze', formData);
      const output = response.data?.result || response.data;
      setResult(output);
      showToast('Intelligent budget plan generated!', 'success');
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Budget plan request failed';
      setError({ message: msg, stack: err.stack });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateBudget({ monthlyIncome: 6000, budgetRule: '50/30/20 Rule' });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Budget Planner Dashboard</h1>
          <p className="text-sm text-slate-400">Autonomous Budget Allocation Microservice (Port 3003 / Server 5003)</p>
        </div>

        <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
          Port Client :3003 | Server :5003
        </span>
      </div>

      {/* Input Form */}
      <BudgetInputForm onSubmit={handleGenerateBudget} loading={loading} />

      {/* Error Alert */}
      {error && (
        <ErrorComponent
          title="Budget Planning Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* Results */}
      {result && !loading && (
        <div className="space-y-6">
          <AllocationChart allocation={result.budgetAllocation} />
          <CategoryBudgets categoryBudgets={result.categoryBudgets} />
          <SpendingLimits spendingLimits={result.spendingLimits} />
          <BudgetRecommendations recommendations={result.recommendations} />
        </div>
      )}
    </div>
  );
}
