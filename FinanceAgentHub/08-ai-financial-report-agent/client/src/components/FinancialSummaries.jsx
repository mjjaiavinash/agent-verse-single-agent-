import React from 'react';
import { DollarSign, TrendingUp, PieChart, ShieldCheck } from 'lucide-react';

export default function FinancialSummaries({ result }) {
  if (!result) return null;

  const { incomeSummary, expenseSummary, savingsSummary } = result;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Income Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Income Summary</span>
          </span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
            ${`₹{Number(incomeSummary?.totalIncome || 0).toLocaleString()}`}
          </span>
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Primary Source</span>
            <span className="text-slate-200 font-medium">{incomeSummary?.primarySource || 'Salary'}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Active Revenue Streams</span>
            <span className="text-slate-200 font-mono font-medium">{incomeSummary?.sourcesCount || 1} Stream(s)</span>
          </div>
        </div>
      </div>

      {/* Expense Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <PieChart className="w-4 h-4 text-rose-400" />
            <span>Expense Summary</span>
          </span>
          <span className="text-xs font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30 font-bold">
            ${`₹{Number(expenseSummary?.totalExpenses || 0).toLocaleString()}`}
          </span>
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Fixed Obligations</span>
            <span className="text-slate-200 font-mono font-medium">${`₹{Number(expenseSummary?.fixedExpenses || 0).toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Discretionary Spend</span>
            <span className="text-slate-200 font-mono font-medium">${`₹{Number(expenseSummary?.discretionaryExpenses || 0).toLocaleString()}`}</span>
          </div>
        </div>
      </div>

      {/* Savings Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Savings Summary</span>
          </span>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 font-bold">
            ${`₹{Number(savingsSummary?.netSavings || 0).toLocaleString()}`}
          </span>
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Net Savings Rate</span>
            <span className="text-cyan-400 font-mono font-bold">{`₹{savingsSummary?.savingsRate || 0}%`}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Liquid Buffer</span>
            <span className="text-slate-200 font-mono font-medium">{`₹{savingsSummary?.monthsOfBuffer || 4.5} Months`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
