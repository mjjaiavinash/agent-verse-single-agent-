import React from 'react';
import { PieChart, Tag } from 'lucide-react';

export default function TopCategories({ categories = [] }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <PieChart className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-base">Top Categories Breakdown</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Distribution
        </span>
      </div>

      <div className="space-y-3">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">{cat.category}</span>
              <div className="flex items-center space-x-2 font-mono">
                <span className="text-slate-400">`₹${{Number(cat.amount).toFixed(2)}`}</span>
                <span className="text-emerald-400 font-bold">{`₹{cat.percentage}%`}</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `₹{cat.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
