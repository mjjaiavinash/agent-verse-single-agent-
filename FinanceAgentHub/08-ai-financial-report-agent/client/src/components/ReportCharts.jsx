import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function ReportCharts({ result }) {
  if (!result) return null;

  const income = result.incomeSummary?.totalIncome || 7200;
  const expenses = result.expenseSummary?.totalExpenses || 4500;
  const savings = result.savingsSummary?.netSavings || 2700;

  const maxVal = Math.max(income, expenses, savings);

  const items = [
    { label: 'Total Inflow', amount: income, color: 'from-emerald-600 to-teal-500', textColor: 'text-emerald-400' },
    { label: 'Total Outflow', amount: expenses, color: 'from-rose-600 to-pink-500', textColor: 'text-rose-400' },
    { label: 'Net Savings Surplus', amount: savings, color: 'from-cyan-600 to-blue-500', textColor: 'text-cyan-400' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">Monthly Cash Flow Distribution</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Executive Chart
        </span>
      </div>

      <div className="grid grid-cols-3 gap-6 items-end h-48 pt-6 px-6 bg-slate-950/60 rounded-xl border border-slate-800/80">
        {items.map((item, idx) => {
          const heightPercent = Math.round((item.amount / maxVal) * 100);
          return (
            <div key={idx} className="flex flex-col items-center space-y-2 h-full justify-end">
              <span className={`text-xs font-mono font-bold ${item.textColor}`}>${`${Number(item.amount).toLocaleString()}`}</span>
              <div className="w-full bg-slate-800 rounded-t-xl overflow-hidden h-full flex items-end">
                <div
                  className={`w-full bg-gradient-to-t ${item.color} rounded-t-xl transition-all duration-700` }
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-400 font-mono text-center">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
