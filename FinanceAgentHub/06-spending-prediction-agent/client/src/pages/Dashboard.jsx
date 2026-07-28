import React, { useState, useEffect } from 'react';
import PredictionInputForm from '../components/PredictionInputForm.jsx';
import PredictionMetrics from '../components/PredictionMetrics.jsx';
import ForecastChart from '../components/ForecastChart.jsx';
import RiskFactorsCard from '../components/RiskFactorsCard.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleGeneratePrediction = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analyze', formData);
      const output = response.data?.result || response.data;
      setResult(output);
      showToast(`Next Month Forecast: $${output.predictedNextMonthSpending} (${Math.round(output.confidenceScore * 100)}% confidence)`, 'success');
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Prediction request failed';
      setError({ message: msg, stack: err.stack });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGeneratePrediction({ monthlyIncome: 5500, recentMonthlyAvg: 4000 });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Spending Prediction Dashboard</h1>
          <p className="text-sm text-slate-400">Autonomous Temporal Predictive Outflow Modeling Microservice (Port 3005 / Server 5005)</p>
        </div>

        <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
          Port Client :3005 | Server :5005
        </span>
      </div>

      {/* Metrics Row */}
      {result && <PredictionMetrics result={result} />}

      {/* Input Form */}
      <PredictionInputForm onSubmit={handleGeneratePrediction} loading={loading} />

      {/* Error Alert */}
      {error && (
        <ErrorComponent
          title="Prediction Engine Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* Forecast Visualizations */}
      {result && !loading && (
        <div className="space-y-6">
          <ForecastChart futureTrends={result.futureTrends} />
          <RiskFactorsCard riskFactors={result.riskFactors} />
        </div>
      )}
    </div>
  );
}
