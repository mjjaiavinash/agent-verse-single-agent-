import React, { useState } from 'react';
import { FileText, DollarSign, Calendar, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function ReportInputForm({ onSubmit, loading }) {
  const [reportMonth, setReportMonth] = useState('July 2026');
  const [income, setIncome] = useState('7200');
  const [expenses, setExpenses] = useState('4500');
  const [fixedCosts, setFixedCosts] = useState('2800');

  const presets = [
    { month: 'July 2026', inc: '7200', exp: '4500', fix: '2800' },
    { month: 'June 2026', inc: '6800', exp: '4100', fix: '2700' },
    { month: 'Q2 Executive Summary', inc: '21500', exp: '13200', fix: '8400' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!income || loading) return;
    onSubmit({
      reportMonth: reportMonth.trim(),
      monthlyIncome: parseFloat(income),
      monthlyExpenses: parseFloat(expenses),
      fixedCosts: parseFloat(fixedCosts || 0),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Generate Monthly Financial Report</h3>
            <p className="text-xs text-slate-400">Groq AI Executive Financial Synthesis</p>
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
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reporting Period / Month</span>
          </label>
          <input
            type="text"
            required
            value={reportMonth}
            onChange={(e) => setReportMonth(e.target.value)}
            placeholder="July 2026"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Total Monthly Inflow / Income ($)</span>
          </label>
          <input
            type="number"
            required
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="7200"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-rose-400" />
            <span>Total Monthly Expenses ($)</span>
          </label>
          <input
            type="number"
            required
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            placeholder="4500"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Fixed Monthly Obligations ($)</span>
          </label>
          <input
            type="number"
            required
            value={fixedCosts}
            onChange={(e) => setFixedCosts(e.target.value)}
            placeholder="2800"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Quick Report Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setReportMonth(p.month); setIncome(p.inc); setExpenses(p.exp); setFixedCosts(p.fix); }}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1.5 rounded-lg transition-all"
            >
              {p.month}
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
              <span>Synthesizing Report...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Executive Report</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
