import React from 'react';
import { Sliders } from 'lucide-react';

export default function SpendingLimits({ spendingLimits = [] }) {
  if (!spendingLimits || spendingLimits.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-slate-100 text-base">Enforced Spending Ceilings</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Discretionary Caps
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {spendingLimits.map((limit, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
            <div className="text-xs text-slate-400 font-medium">{limit.period}</div>
            <div className="text-2xl font-bold text-amber-400 font-mono">
              `₹${{Number(limit.limit).toFixed(2)}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
