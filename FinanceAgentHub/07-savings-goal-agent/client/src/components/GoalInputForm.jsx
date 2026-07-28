import React, { useState } from 'react';
import { Target, DollarSign, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function GoalInputForm({ onSubmit, loading }) {
  const [goalName, setGoalName] = useState('Emergency Reserve Fund');
  const [targetAmount, setTargetAmount] = useState('20000');
  const [currentSavings, setCurrentSavings] = useState('8500');
  const [monthlyContribution, setMonthlyContribution] = useState('500');

  const presets = [
    { label: 'Emergency Reserve', name: 'Emergency Fund (6 Mos)', target: '20000', curr: '8500', contrib: '500' },
    { label: 'Home Down Payment', name: 'Home Down Payment', target: '50000', curr: '18000', contrib: '1200' },
    { label: 'Vacation Fund', name: 'Japan Travel Fund', target: '6000', curr: '2400', contrib: '400' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalName || !targetAmount || loading) return;
    onSubmit({
      goalName: goalName.trim(),
      targetAmount: parseFloat(targetAmount),
      currentSavings: parseFloat(currentSavings || 0),
      monthlyContribution: parseFloat(monthlyContribution || 100),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Create & Track Savings Goal</h3>
            <p className="text-xs text-slate-400">AI Goal Acceleration & Timeline Predictor</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Groq AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>Goal Name *</span>
          </label>
          <input
            type="text"
            required
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g. New Car, Down Payment, Emergency Fund"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Target Amount (₹) *</span>
          </label>
          <input
            type="number"
            required
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="20000"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
            <span>Current Saved Amount (₹)</span>
          </label>
          <input
            type="number"
            required
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            placeholder="8500"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-purple-400" />
            <span>Monthly Contribution (₹)</span>
          </label>
          <input
            type="number"
            required
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            placeholder="500"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Quick Goal Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setGoalName(p.name); setTargetAmount(p.target); setCurrentSavings(p.curr); setMonthlyContribution(p.contrib); }}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 px-3 py-1.5 rounded-lg transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex justify-end">
        <button
          type="submit"
          disabled={!goalName || !targetAmount || loading}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Goal Timeline...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Track Savings Goal</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
