import React, { useState } from 'react';
import { ShieldCheck, DollarSign, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function HealthInputForm({ onSubmit, loading }) {
  const [income, setIncome] = useState('6500');
  const [expenses, setExpenses] = useState('4200');
  const [debt, setDebt] = useState('12000');
  const [savings, setSavings] = useState('18500');
  const [investments, setInvestments] = useState('24000');

  const presets = [
    { label: 'Solid Financial Profile', inc: '6500', exp: '4200', debt: '12000', sav: '18500', inv: '24000' },
    { label: 'High Debt Burden', inc: '5000', exp: '4600', debt: '38000', sav: '2500', inv: '0' },
    { label: 'Wealth Builder Profile', inc: '12000', exp: '5500', debt: '5000', sav: '45000', inv: '110000' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income || loading) return;
    onSubmit({
      monthlyIncome: parseFloat(income),
      monthlyExpenses: parseFloat(expenses),
      totalDebt: parseFloat(debt),
      totalSavings: parseFloat(savings),
      totalInvestments: parseFloat(investments),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Financial Health Assessment Payload</h3>
            <p className="text-xs text-slate-400">Comprehensive Credit & Health Score Calculator</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Groq AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monthly Income ($)</span>
          </label>
          <input
            type="number"
            required
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-rose-400" />
            <span>Monthly Expenses ($)</span>
          </label>
          <input
            type="number"
            required
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Total Outstanding Debt ($)</span>
          </label>
          <input
            type="number"
            required
            value={debt}
            onChange={(e) => setDebt(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
            <span>Total Liquid Savings ($)</span>
          </label>
          <input
            type="number"
            required
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-purple-400" />
            <span>Total Investment Portfolio ($)</span>
          </label>
          <input
            type="number"
            required
            value={investments}
            onChange={(e) => setInvestments(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Quick Scenario Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setIncome(p.inc); setExpenses(p.exp); setDebt(p.debt); setSavings(p.sav); setInvestments(p.inv); }}
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
          disabled={!income || loading}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Computing Health Score...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Evaluate Health Score</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
