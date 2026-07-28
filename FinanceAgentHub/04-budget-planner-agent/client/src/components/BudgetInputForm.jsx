import React, { useState } from 'react';
import { PieChart, DollarSign, Sparkles, RefreshCw, Sliders } from 'lucide-react';

export default function BudgetInputForm({ onSubmit, loading }) {
  const [income, setIncome] = useState('6000');
  const [rule, setRule] = useState('50/30/20 Rule');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income || loading) return;
    onSubmit({ monthlyIncome: parseFloat(income), budgetRule: rule });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Monthly Budget Planner</h3>
            <p className="text-xs text-slate-400">50/30/20 & Custom Budget Allocation Engine</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Groq AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monthly Net Income ($) *</span>
          </label>
          <input
            type="number"
            step="50"
            min="500"
            required
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="6000"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Budget Allocation Framework</span>
          </label>
          <select
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all"
          >
            <option value="50/30/20 Rule">50/30/20 Rule (Standard Needs/Wants/Savings)</option>
            <option value="60/20/20 Rule">60/20/20 Rule (High Fixed Obligations)</option>
            <option value="70/20/10 Rule">70/20/10 Rule (Aggressive Debt Focus)</option>
          </select>
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
              <span>Calculating Allocations...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Monthly Budget</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
