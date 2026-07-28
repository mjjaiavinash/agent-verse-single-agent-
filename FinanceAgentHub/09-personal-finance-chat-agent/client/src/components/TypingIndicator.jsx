import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-start space-x-3 text-slate-100 animate-fadeIn">
      <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 shrink-0">
        <Bot className="w-5 h-5" />
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-sm flex items-center space-x-1.5">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.2s]" />
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.4s]" />
        <span className="text-xs text-slate-400 font-mono ml-2">Groq AI Thinking...</span>
      </div>
    </div>
  );
}
