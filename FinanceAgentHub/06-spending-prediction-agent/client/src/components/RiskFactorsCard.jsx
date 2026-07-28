import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function RiskFactorsCard({ riskFactors = [] }) {
  if (!riskFactors || riskFactors.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold text-slate-100 text-base">Forecasted Financial Risk Factors</h3>
      </div>

      <div className="space-y-3">
        {riskFactors.map((factor, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">{factor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
