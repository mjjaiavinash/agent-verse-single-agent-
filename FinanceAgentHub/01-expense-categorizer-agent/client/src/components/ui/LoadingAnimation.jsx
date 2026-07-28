import React from 'react';
import { Tag, RefreshCw, Sparkles } from 'lucide-react';

export default function LoadingAnimation({ message = 'Categorizing Expense Payload...' }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center space-y-4 text-center animate-pulse">
      <div className="relative">
        <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/40 rounded-2xl flex items-center justify-center text-cyan-400">
          <Tag className="w-8 h-8" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-slate-950 p-1.5 rounded-full border border-slate-800 text-cyan-400">
          <RefreshCw className="w-4 h-4 animate-spin" />
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="font-bold text-slate-100 text-base">Expense Categorizer Agent</h4>
        <p className="text-xs text-cyan-400 font-mono flex items-center justify-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{message}</span>
        </p>
      </div>
    </div>
  );
}
