import React from 'react';
import { Lightbulb, DollarSign } from 'lucide-react';

export default function SavingsTipsList({ tips = [] }) {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-slate-100 text-base">Actionable Savings Tips</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          Cost-Reduction Strategy
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((tip, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-100 text-sm leading-snug">{tip.title}</h4>
                {tip.potentialSavings && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-xs shrink-0 ml-2">
                    +{`₹${tip.potentialSavings}/mo`}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
