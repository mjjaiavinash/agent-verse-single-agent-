import React from 'react';
import { Flag, CheckCircle2 } from 'lucide-react';

export default function MilestoneChart({ milestones = [] }) {
  if (!milestones || milestones.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Flag className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-base">Goal Milestones Timeline</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Progress Timeline
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {milestones.map((m, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 font-mono">{m.milestone}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                {m.status}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono flex items-center space-x-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target: {m.targetDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
