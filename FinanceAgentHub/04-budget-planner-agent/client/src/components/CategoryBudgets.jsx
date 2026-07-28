import React from 'react';
import { Tag } from 'lucide-react';

export default function CategoryBudgets({ categoryBudgets = [] }) {
  if (!categoryBudgets || categoryBudgets.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Tag className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">Itemized Category Budgets</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Monthly Allocations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categoryBudgets.map((item, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">{item.category}</span>
              <div className="flex items-center space-x-2 font-mono">
                <span className="text-cyan-400 font-bold">{`₹${Number(item.allocated).toFixed(2)}`}</span>
                <span className="text-slate-500">({item.percentage}%)</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
