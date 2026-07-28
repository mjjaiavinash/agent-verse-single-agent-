import React, { useState } from 'react';
import { AlertCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

export default function ErrorComponent({ title = 'Operation Failed', message, stack, onRetry }) {
  const [showStack, setShowStack] = useState(false);

  return (
    <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-6 shadow-xl space-y-4 text-rose-100">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-1">
          <h4 className="font-bold text-rose-200 text-base">{title}</h4>
          <p className="text-sm text-rose-300/90 leading-relaxed">{message || 'An unexpected error occurred during execution.'}</p>
        </div>
      </div>

      {stack && (
        <div className="pt-2">
          <button
            onClick={() => setShowStack(!showStack)}
            className="text-xs font-mono text-rose-400 hover:text-rose-200 flex items-center space-x-1"
          >
            <span>{showStack ? 'Hide Details' : 'Show Error Details'}</span>
            {showStack ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showStack && (
            <pre className="mt-2 p-3 bg-slate-950 border border-rose-900/50 rounded-xl text-[11px] font-mono text-rose-300/80 overflow-x-auto">
              {stack}
            </pre>
          )}
        </div>
      )}

      {onRetry && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onRetry}
            className="bg-rose-900/60 hover:bg-rose-800/80 border border-rose-700 text-rose-100 text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
