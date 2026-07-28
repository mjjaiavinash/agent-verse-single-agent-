import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AIInsightsCard({ insights = [] }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h3 className="font-bold text-slate-100 text-base">Groq AI Behavioral Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-200 leading-relaxed font-sans">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
