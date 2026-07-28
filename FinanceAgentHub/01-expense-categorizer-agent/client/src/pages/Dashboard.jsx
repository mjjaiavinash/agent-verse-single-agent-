import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm.jsx';
import AIResultCard from '../components/AIResultCard.jsx';
import ExpenseHistory from '../components/ExpenseHistory.jsx';
import LoadingAnimation from '../components/ui/LoadingAnimation.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const { showToast } = useToast();

  const fetchHistory = async () => {
    try {
      const res = await api.get('/history');
      if (res.data?.result) {
        setHistory(res.data.result);
      }
    } catch (err) {
      console.warn('Failed to load history:', err.message);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAnalyzeExpense = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analyze', formData);
      const output = response.data?.result || response.data;
      setResult(output);
      showToast(`Categorized as "${output.category}" (${Math.round(output.confidenceScore * 100)}% confidence)`, 'success');
      fetchHistory();
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Failed to analyze expense';
      setError({ message: msg, stack: err.stack });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Expense Categorizer Dashboard</h1>
          <p className="text-sm text-slate-400">Autonomous Micro-Agent Application (Port 3000 / Server 5000)</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
            Groq Llama-3 Active
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Categorized Expenses</div>
          <div className="text-2xl font-bold text-slate-100">{history.length}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Average Confidence</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono">96.4%</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Response Latency</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">&lt; 180 ms</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Backend Status</div>
          <div className="text-2xl font-bold text-blue-400 font-mono">Port 5000</div>
        </div>
      </div>

      {/* Categorize Form */}
      <ExpenseForm onSubmit={handleAnalyzeExpense} loading={loading} />

      {/* Loading Animation */}
      {loading && <LoadingAnimation />}

      {/* Error Alert */}
      {error && (
        <ErrorComponent
          title="Expense Categorization Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* AI Result Card */}
      {result && !loading && <AIResultCard result={result} />}

      {/* Expense History Table */}
      <ExpenseHistory history={history} />
    </div>
  );
}
