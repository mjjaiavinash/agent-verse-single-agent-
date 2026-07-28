import React from 'react';
import { Activity, ShieldCheck, DollarSign, PieChart, Wallet } from 'lucide-react';

export default function SubScoreBreakdown({ subScores }) {
  if (!subScores) return null;

  const items = [
    { label: 'Liquidity Buffer', score: subScores.liquidity || 88, icon: Wallet, color: 'bg-emerald-500' },
    { label: 'Debt-to-Income Health', score: subScores.debtToIncome || 80, icon: ShieldCheck, color: 'bg-cyan-500' },
    { label: 'Savings Rate Efficiency', score: subScores.savingsRate || 85, icon: DollarSign, color: 'bg-blue-500' },
    { label: 'Investment Portfolio Ratio', score: subScores.investmentRatio || 82, icon: PieChart, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">Financial Component Sub-Scores</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Metric Breakdown
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 font-semibold text-slate-200">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </div>
                <span className="font-mono text-cyan-400 font-bold">{`${item.score} / 100` }</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
