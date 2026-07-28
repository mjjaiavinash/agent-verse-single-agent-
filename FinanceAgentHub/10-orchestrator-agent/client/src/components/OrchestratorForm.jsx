import React, { useState } from 'react';
import { Cpu, Send, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function OrchestratorForm({ onSubmit, loading }) {
  const [query, setQuery] = useState(
    'Categorize my ₹85 Starbucks transaction, check my budget limits, and assess my financial health score.'
  );

  const presets = [
    'Categorize my ₹85 Starbucks transaction, check my budget limits, and assess financial health.',
    'Analyze my spending pattern history and generate personalized savings advice.',
    'Predict next month spending and build a 50/30/20 monthly budget plan.',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    onSubmit({ userQuery: query.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Multi-Agent Master Orchestrator</h3>
            <p className="text-xs text-slate-400">Task Decomposition & Multi-Service Dispatch</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Groq AI Core</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300">Master User Financial Query</label>
        <textarea
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter complex query requiring multi-agent execution..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
        />
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Sample Multi-Agent Queries:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setQuery(p)}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1.5 rounded-lg transition-all text-left"
            >
              "{p}"
            </button>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex justify-end">
        <button
          type="submit"
          disabled={!query.trim() || loading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Orchestrating Agents...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Execute Orchestration</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
