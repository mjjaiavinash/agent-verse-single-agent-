import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function StrengthsWeaknesses({ strengths = [], weaknesses = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strengths */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-base">Key Financial Strengths</h3>
        </div>
        <div className="space-y-2.5">
          {strengths.map((str, idx) => (
            <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-emerald-950/80 flex items-start space-x-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{str}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weaknesses */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-slate-100 text-base">Risk Areas & Vulnerabilities</h3>
        </div>
        <div className="space-y-2.5">
          {weaknesses.map((weak, idx) => (
            <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-amber-950/80 flex items-start space-x-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">{weak}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
