import React from 'react';
import { Bot, RefreshCw } from 'lucide-react';

export default function LoadingScreen({ message = 'Loading agent environment...' }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 space-y-6 text-center">
      <div className="relative">
        <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/40 rounded-2xl flex items-center justify-center text-cyan-400 animate-pulse">
          <Bot className="w-8 h-8" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-800 p-1.5 rounded-full text-cyan-400 shadow-lg">
          <RefreshCw className="w-4 h-4 animate-spin" />
        </div>
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="font-bold text-slate-100 text-lg">Financial Health Score Agent</h3>
        <p className="text-xs text-slate-400 font-mono animate-pulse">{message}</p>
      </div>

      <div className="w-48 bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-1/2 animate-pulse rounded-full" />
      </div>
    </div>
  );
}
