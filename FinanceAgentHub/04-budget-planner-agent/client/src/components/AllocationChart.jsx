import React from 'react';
import { PieChart, ShieldCheck, HeartHandshake, PiggyBank } from 'lucide-react';

export default function AllocationChart({ allocation }) {
  if (!allocation) return null;

  const { needs, wants, savings } = allocation;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <PieChart className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">50/30/20 Macro Allocation</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Framework Distribution
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Needs Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-blue-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Needs (50%)</span>
            </span>
            <span className="font-mono text-slate-300 font-bold">${`${Number(needs?.amount || 0).toFixed(0)}`}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full w-1/2" />
          </div>
          <p className="text-[11px] text-slate-500">Rent, Utilities, Food, Transit</p>
        </div>

        {/* Wants Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-purple-400 flex items-center space-x-1.5">
              <HeartHandshake className="w-4 h-4" />
              <span>Wants (30%)</span>
            </span>
            <span className="font-mono text-slate-300 font-bold">${`${Number(wants?.amount || 0).toFixed(0)}`}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full w-[30%]" />
          </div>
          <p className="text-[11px] text-slate-500">Dining Out, Shopping, Leisure</p>
        </div>

        {/* Savings Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-400 flex items-center space-x-1.5">
              <PiggyBank className="w-4 h-4" />
              <span>Savings (20%)</span>
            </span>
            <span className="font-mono text-slate-300 font-bold">${`${Number(savings?.amount || 0).toFixed(0)}`}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[20%]" />
          </div>
          <p className="text-[11px] text-slate-500">Emergency Fund, Investments</p>
        </div>
      </div>
    </div>
  );
}
