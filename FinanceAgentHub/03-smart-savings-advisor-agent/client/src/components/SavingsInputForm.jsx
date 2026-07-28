import React, { useState } from 'react';
import { PiggyBank, DollarSign, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function SavingsInputForm({ onSubmit, loading }) {
  const [income, setIncome] = useState('5500');
  const [expenses, setExpenses] = useState('3800');

  const presets = [
    { label: 'Moderate Single Earner', inc: '5500', exp: '3800' },
    { label: 'High Income, High Spend', inc: '9200', exp: '7100' },
    { label: 'Tight Budget Scenario', inc: '3400', exp: '3050' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income || !expenses || loading) return;
    onSubmit({ monthlyIncome: parseFloat(income), monthlyExpenses: parseFloat(expenses) });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Personal Savings Advisor Input</h3>
            <p className="text-xs text-slate-400">AI Wealth Optimization & Risk Mitigation</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Groq AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Income */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monthly Total Income ($) *</span>
          </label>
          <input
            type="number"
            step="10"
            min="100"
            required
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="5500"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Monthly Expenses */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <DollarSign className="w-3.5 h-3.5 text-rose-400" />
            <span>Total Monthly Expenses (₹) *</span>
          </label>
          <input
            type="number"
            step="10"
            min="0"
            required
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            placeholder="3800"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Quick Preset Scenarios:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setIncome(p.inc); setExpenses(p.exp); }}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 px-3 py-1.5 rounded-lg transition-all"
            >
              {`₹{p.label} ($${p.inc} / $${p.exp})`}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex justify-end">
        <button
          type="submit"
          disabled={!income || loading}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Financials...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Savings Plan</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
