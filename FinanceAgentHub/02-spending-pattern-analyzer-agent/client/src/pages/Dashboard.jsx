import React, { useState, useEffect } from 'react';
import SpendingForm from '../components/SpendingForm.jsx';
import TrendsChart from '../components/TrendsChart.jsx';
import TopCategories from '../components/TopCategories.jsx';
import SpendingHeatmap from '../components/SpendingHeatmap.jsx';
import AIInsightsCard from '../components/AIInsightsCard.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import { TrendingUp, DollarSign, Activity, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleRunAnalysis = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analyze', formData);
      const output = response.data?.result || response.data;
      setResult(output);
      showToast('Spending pattern analysis generated!', 'success');
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Analysis failed';
      setError({ message: msg, stack: err.stack });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial analysis with sample Indian Rupee dataset
    handleRunAnalysis({
      monthlyIncome: 75000,
      totalExpenses: 35000,
      transactions: [
        { expenseName: 'Starbucks Coffee', amount: 350 },
        { expenseName: 'Grocery Supermarket', amount: 3500 },
        { expenseName: 'Uber Commute', amount: 750 },
        { expenseName: 'Monthly Rent', amount: 25000 },
        { expenseName: 'Electronics Store', amount: 4200 },
        { expenseName: 'Netflix Subscription', amount: 499 },
        { expenseName: 'Petrol Gas Station', amount: 1200 }
      ]
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Spending Pattern Analyzer Dashboard</h1>
          <p className="text-sm text-slate-400">Autonomous Pattern Recognition Engine (Port 3001 / Server 5001)</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
            Port Client :3001 | Server :5001
          </span>
        </div>
      </div>

      {/* Hero Metric */}
      {result && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Analyzed Outflow</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
              {`₹${Number(result.totalSpent || 0).toFixed(2)}`}
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Timeframe: <strong className="text-slate-200">{result.timeframe || 'Monthly'}</strong></span>
          </div>
        </div>
      )}

      {/* Input Form */}
      <SpendingForm onSubmit={handleRunAnalysis} loading={loading} />

      {/* Error Component */}
      {error && (
        <ErrorComponent
          title="Analysis Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* Visualizations Grid */}
      {result && !loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrendsChart weeklyTrends={result.weeklyTrends} />
            <TopCategories categories={result.topCategories} />
          </div>

          <SpendingHeatmap heatmap={result.spendingHeatmap} />

          <AIInsightsCard insights={result.aiInsights} />
        </div>
      )}
    </div>
  );
}
