import React from 'react';
import { PiggyBank, DollarSign, TrendingUp, ShieldCheck } from 'lucide-react';

export default function SavingsMetrics({ result }) {
  if (!result) return null;

  const { monthlyIncome, monthlyExpenses, currentSavingsRate, estimatedMonthlySavings, estimatedAnnualSavings } = result;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Monthly Net Cash</span>
          <DollarSign className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-bold text-slate-100 font-mono">
          {`$${Number(monthlyIncome - monthlyExpenses).toFixed(2)}`}
        </div>
        <div className="text-[11px] text-slate-500">Disposable Monthly Cash</div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Current Savings Rate</span>
          <TrendingUp className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-2xl font-bold text-cyan-400 font-mono">
          {`${currentSavingsRate}%`}
        </div>
        <div className="text-[11px] text-slate-500">Net Savings vs Income</div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Target Monthly Savings</span>
          <PiggyBank className="w-4 h-4 text-teal-400" />
        </div>
        <div className="text-2xl font-bold text-emerald-400 font-mono">
          {`$${Number(estimatedMonthlySavings).toFixed(0)}`}
        </div>
        <div className="text-[11px] text-slate-500">Optimized Monthly Potential</div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Annual Savings Projection</span>
          <ShieldCheck className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-2xl font-bold text-amber-400 font-mono">
          {`$${Number(estimatedAnnualSavings).toLocaleString()}`}
        </div>
        <div className="text-[11px] text-slate-500">12-Month Accumulated Capital</div>
      </div>
    </div>
  );
}
