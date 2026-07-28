import React, { useState, useEffect } from 'react';
import ReportInputForm from '../components/ReportInputForm.jsx';
import ReportExecutiveSummary from '../components/ReportExecutiveSummary.jsx';
import FinancialSummaries from '../components/FinancialSummaries.jsx';
import ReportCharts from '../components/ReportCharts.jsx';
import ReportRecommendations from '../components/ReportRecommendations.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleGenerateReport = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/analyze', formData);
      const output = response.data?.result || response.data;
      setResult(output);
      showToast(`Executive Report generated for "${output.reportMonth}"`, 'success');
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Report generation failed';
      setError({ message: msg, stack: err.stack });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerateReport({
      reportMonth: 'July 2026',
      monthlyIncome: 7200,
      monthlyExpenses: 4500,
      fixedCosts: 2800,
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">AI Financial Report Dashboard</h1>
          <p className="text-sm text-slate-400">Autonomous Monthly Financial Synthesis & PDF Export Microservice (Port 3007 / Server 5007)</p>
        </div>

        <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
          Port Client :3007 | Server :5007
        </span>
      </div>

      {/* Input Form */}
      <ReportInputForm onSubmit={handleGenerateReport} loading={loading} />

      {/* Error Alert */}
      {error && (
        <ErrorComponent
          title="Report Engine Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* Output Results & Executive Report */}
      {result && !loading && (
        <div className="space-y-6">
          <ReportExecutiveSummary result={result} />
          <FinancialSummaries result={result} />
          <ReportCharts result={result} />
          <ReportRecommendations recommendations={result.recommendations} />
        </div>
      )}
    </div>
  );
}
