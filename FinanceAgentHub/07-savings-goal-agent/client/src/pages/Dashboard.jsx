import React, { useState, useEffect } from 'react';
import GoalInputForm from '../components/GoalInputForm.jsx';
import GoalProgressCard from '../components/GoalProgressCard.jsx';
import MilestoneChart from '../components/MilestoneChart.jsx';
import GoalSuggestions from '../components/GoalSuggestions.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleAnalyzeGoal = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analyze', formData);
      const output = response.data?.result || response.data;
      setResult(output);
      showToast(`Savings Goal "${output.goalName}" Tracked (${output.progressPercentage}% Progress)`, 'success');
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Goal tracking request failed';
      setError({ message: msg, stack: err.stack });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyzeGoal({
      goalName: 'Emergency Reserve Fund',
      targetAmount: 20000,
      currentSavings: 8500,
      monthlyContribution: 500,
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Savings Goal Agent Dashboard</h1>
          <p className="text-sm text-slate-400">Autonomous Savings Goal & Timeline Acceleration Microservice (Port 3006 / Server 5006)</p>
        </div>

        <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-400">
          Port Client :3006 | Server :5006
        </span>
      </div>

      {/* Main Goal Progress Card */}
      {result && !loading && <GoalProgressCard result={result} />}

      {/* Input Form */}
      <GoalInputForm onSubmit={handleAnalyzeGoal} loading={loading} />

      {/* Error Alert */}
      {error && (
        <ErrorComponent
          title="Savings Goal Engine Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* Milestones & AI Suggestions */}
      {result && !loading && (
        <div className="space-y-6">
          <MilestoneChart milestones={result.milestones} />
          <GoalSuggestions suggestions={result.suggestions} />
        </div>
      )}
    </div>
  );
}
