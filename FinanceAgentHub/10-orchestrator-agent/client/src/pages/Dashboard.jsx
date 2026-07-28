import React, { useState, useEffect } from 'react';
import OrchestratorForm from '../components/OrchestratorForm.jsx';
import ConnectedAgentsGrid from '../components/ConnectedAgentsGrid.jsx';
import ExecutionTimeline from '../components/ExecutionTimeline.jsx';
import MasterResponseCard from '../components/MasterResponseCard.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [agentsStatus, setAgentsStatus] = useState([]);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const fetchAgentsStatus = async () => {
    try {
      const res = await api.get('/agents-status');
      if (res.data?.result) {
        setAgentsStatus(res.data.result);
      }
    } catch (err) {
      console.warn('Network ping error:', err.message);
    }
  };

  useEffect(() => {
    fetchAgentsStatus();
  }, []);

  const handleRunOrchestration = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/orchestrate', formData);
      const output = response.data?.result || response.data;
      setResult(output);
      showToast(`Orchestration completed in ${output.totalExecutionTimeMs}ms across ${output.selectedAgents?.length || 3} agents!`, 'success');
      fetchAgentsStatus();
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Orchestration request failed';
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
          <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Orchestrator Agent Dashboard</h1>
          <p className="text-sm text-slate-400">Distributed Multi-Agent Master Routing & Synthesis Engine (Port 3009 / Server 5009)</p>
        </div>

        <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
          Master Node Port :5009
        </span>
      </div>

      {/* Connected Network Status Grid */}
      <ConnectedAgentsGrid agents={agentsStatus} />

      {/* Orchestrator Master Form */}
      <OrchestratorForm onSubmit={handleRunOrchestration} loading={loading} />

      {/* Error Alert */}
      {error && (
        <ErrorComponent
          title="Orchestration Dispatch Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* Results & Master Response */}
      {result && !loading && (
        <div className="space-y-6">
          <MasterResponseCard result={result} />
          <ExecutionTimeline timeline={result.orchestrationTimeline} totalLatency={result.totalExecutionTimeMs} />
        </div>
      )}
    </div>
  );
}
