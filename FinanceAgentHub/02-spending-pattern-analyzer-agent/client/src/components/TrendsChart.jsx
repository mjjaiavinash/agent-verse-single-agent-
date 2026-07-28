import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function TrendsChart({ weeklyTrends = [] }) {
  if (!weeklyTrends || weeklyTrends.length === 0) return null;

  const maxAmount = Math.max(...weeklyTrends.map(t => t.amount || 1));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">Weekly Spending Trends</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          4-Week Temporal Analysis
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 items-end h-48 pt-6 px-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
        {weeklyTrends.map((trend, idx) => {
          const heightPercent = Math.round((trend.amount / maxAmount) * 100);
          return (
            <div key={idx} className="flex flex-col items-center space-y-2 h-full justify-end">
              <span className="text-[11px] font-mono font-semibold text-cyan-400">${`₹{Number(trend.amount).toFixed(0)}`}</span>
              <div className="w-full bg-slate-800 rounded-t-xl overflow-hidden h-full flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-cyan-600 to-blue-500 rounded-t-xl transition-all duration-700 hover:from-cyan-400 hover:to-blue-400"
                  style={{ height: `₹{heightPercent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-400 font-mono">{trend.week}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
