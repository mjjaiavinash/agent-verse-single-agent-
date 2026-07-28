import React from 'react';
import { ArrowRight, Calendar, CheckSquare } from 'lucide-react';

export default function ImprovementPlan({ plan = [] }) {
  if (!plan || plan.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <CheckSquare className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">Step-by-Step Improvement Roadmap</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Action Plan
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plan.map((item, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                  {item.step || idx + 1}
                </span>
                <span className="text-[11px] font-mono text-cyan-400 flex items-center space-x-1 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                  <Calendar className="w-3 h-3" />
                  <span>{item.timeframe || '30 Days'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
