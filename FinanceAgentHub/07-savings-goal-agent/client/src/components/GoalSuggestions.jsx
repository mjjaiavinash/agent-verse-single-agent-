import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function GoalSuggestions({ suggestions = [] }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
        <Sparkles className="w-5 h-5 text-emerald-400" />
        <h3 className="font-bold text-slate-100 text-base">Groq AI Goal Acceleration Suggestions</h3>
      </div>

      <div className="space-y-3">
        {suggestions.map((sug, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-200 leading-relaxed font-sans">{sug}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
