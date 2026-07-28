import React, { useState } from 'react';
import { LineChart, DollarSign, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function PredictionInputForm({ onSubmit, loading }) {
  const [income, setIncome] = useState('5500');
  const [recentAvg, setRecentAvg] = useState('4000');

  const presets = [
    { label: 'Stable Monthly Flow', inc: '5500', avg: '4000' },
    { label: 'High Income, Rising Spend', inc: '9500', avg: '7200' },
    { label: 'Optimized Tight Budget', inc: '4200', avg: '3100' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income || loading) return;
    onSubmit({ monthlyIncome: parseFloat(income), recentMonthlyAvg: parseFloat(recentAvg) });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <LineChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Predictive Forecasting Input</h3>
            <p className="text-xs text-slate-400">AI Temporal Outflow & Savings Predictor</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Groq AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monthly Income (₹)</span>
          </label>
          <input
            type="number"
            required
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recent 3-Month Average Spend ($)</span>
          </label>
          <input
            type="number"
            required
            value={recentAvg}
            onChange={(e) => setRecentAvg(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Forecast Model Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setIncome(p.inc); setRecentAvg(p.avg); }}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1.5 rounded-lg transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex justify-end">
        <button
          type="submit"
          disabled={!income || loading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating Forecast...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Predict Future Spending</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
