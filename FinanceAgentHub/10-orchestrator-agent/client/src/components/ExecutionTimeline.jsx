import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function ExecutionTimeline({ timeline = [], totalLatency = 380 }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">Pipeline Execution Timeline</h3>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-500/30">
          Total Execution: {totalLatency}ms
        </span>
      </div>

      <div className="space-y-3">
        {timeline.map((step, idx) => (
          <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">{step.step}</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {step.latencyMs}ms
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
