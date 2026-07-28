import React from 'react';
import { LineChart, TrendingUp } from 'lucide-react';

export default function ForecastChart({ futureTrends = [] }) {
  if (!futureTrends || futureTrends.length === 0) return null;

  const maxVal = Math.max(...futureTrends.map(t => t.projectedSpending || 1));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <LineChart className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">3-Month Projected Spending Trends</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Predictive Trajectory
        </span>
      </div>

      <div className="grid grid-cols-3 gap-6 items-end h-52 pt-8 px-6 bg-slate-950/60 rounded-xl border border-slate-800/80">
        {futureTrends.map((item, idx) => {
          const heightPercent = Math.round((item.projectedSpending / maxVal) * 100);
          return (
            <div key={idx} className="flex flex-col items-center space-y-2 h-full justify-end">
              <div className="text-center font-mono space-y-0.5">
                <div className="text-xs font-bold text-cyan-400">{`₹${Number(item.projectedSpending).toFixed(0)}`}</div>
                <div className="text-[10px] text-slate-500">Savings: {`₹${Number(item.projectedSavings).toFixed(0)}`}</div>
              </div>

              <div className="w-full bg-slate-800 rounded-t-xl overflow-hidden h-full flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-cyan-600 to-blue-500 rounded-t-xl transition-all duration-700 hover:from-cyan-400 hover:to-blue-400"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <div className="text-center">
                <div className="text-xs font-medium text-slate-300 font-mono">{item.month}</div>
                <div className="text-[10px] text-emerald-400 font-mono">{item.trajectory}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
