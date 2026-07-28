import React, { useState, useEffect } from 'react';
import SavingsInputForm from '../components/SavingsInputForm.jsx';
import SavingsMetrics from '../components/SavingsMetrics.jsx';
import SavingsTipsList from '../components/SavingsTipsList.jsx';
import AIRecommendations from '../components/AIRecommendations.jsx';
import FinancialWarnings from '../components/FinancialWarnings.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import { PiggyBank } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleGenerateAdvice = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analyze', formData);
      const output = response.data?.result || response.data;
      setResult(output);
      showToast('Smart savings advice generated!', 'success');
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Advisor request failed';
      setError({ message: msg, stack: err.stack });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateAdvice({ monthlyIncome: 5500, monthlyExpenses: 3800 });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Smart Savings Advisor Dashboard</h1>
          <p className="text-sm text-slate-400">Personalized AI Financial Planning Microservice (Port 3002 / Server 5002)</p>
        </div>

        <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-400">
          Port Client :3002 | Server :5002
        </span>
      </div>

      {/* Metrics Row */}
      {result && <SavingsMetrics result={result} />}

      {/* Input Form */}
      <SavingsInputForm onSubmit={handleGenerateAdvice} loading={loading} />

      {/* Error Component */}
      {error && (
        <ErrorComponent
          title="Advisor Execution Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* Output Results */}
      {result && !loading && (
        <div className="space-y-6">
          <SavingsTipsList tips={result.savingsTips} />
          <AIRecommendations recommendations={result.recommendations} />
          <FinancialWarnings warnings={result.warnings} />
        </div>
      )}
    </div>
  );
}
