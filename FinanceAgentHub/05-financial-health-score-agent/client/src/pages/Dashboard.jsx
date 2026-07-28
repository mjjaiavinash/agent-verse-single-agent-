import React, { useState, useEffect } from 'react';
import HealthInputForm from '../components/HealthInputForm.jsx';
import ScoreGauge from '../components/ScoreGauge.jsx';
import SubScoreBreakdown from '../components/SubScoreBreakdown.jsx';
import StrengthsWeaknesses from '../components/StrengthsWeaknesses.jsx';
import ImprovementPlan from '../components/ImprovementPlan.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import { ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleCalculateScore = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analyze', formData);
      const output = response.data?.result || response.data;
      setResult(output);
      showToast(`Financial Health Score: ${output.score}/100 (Grade ${output.grade})`, 'success');
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Scoring request failed';
      setError({ message: msg, stack: err.stack });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculateScore({
      monthlyIncome: 6500,
      monthlyExpenses: 4200,
      totalDebt: 12000,
      totalSavings: 18500,
      totalInvestments: 24000,
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Financial Health Score Dashboard</h1>
          <p className="text-sm text-slate-400">Autonomous Health Scoring & Credit Risk Microservice (Port 3004 / Server 5004)</p>
        </div>

        <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-400">
          Port Client :3004 | Server :5004
        </span>
      </div>

      {/* Main Score Overview */}
      {result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreGauge score={result.score} grade={result.grade} riskLevel={result.riskLevel} />
          <div className="md:col-span-2">
            <SubScoreBreakdown subScores={result.subScores} />
          </div>
        </div>
      )}

      {/* Input Form */}
      <HealthInputForm onSubmit={handleCalculateScore} loading={loading} />

      {/* Error Alert */}
      {error && (
        <ErrorComponent
          title="Health Scoring Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* Results Audit */}
      {result && !loading && (
        <div className="space-y-6">
          <StrengthsWeaknesses strengths={result.strengths} weaknesses={result.weaknesses} />
          <ImprovementPlan plan={result.improvementPlan} />
        </div>
      )}
    </div>
  );
}
