import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function FinancialWarnings({ warnings = [] }) {
  if (!warnings || warnings.length === 0) return null;

  return (
    <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-amber-900/50">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold text-amber-200 text-base">Financial Risk Alerts & Warnings</h3>
      </div>

      <div className="space-y-3">
        {warnings.map((warn, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans">{warn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
