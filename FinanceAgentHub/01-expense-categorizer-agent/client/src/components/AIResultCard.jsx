import React from 'react';
import { CheckCircle2, Tag, ShieldCheck, HelpCircle, DollarSign, Calendar } from 'lucide-react';

export default function AIResultCard({ result }) {
  if (!result) return null;

  const { expenseName, amount, category, confidenceScore, reason, createdAt } = result;

  const confidencePercent = Math.round((confidenceScore || 0.95) * 100);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Food & Dining': return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Transportation': return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'Subscriptions & Software': return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      case 'Utilities & Bills': return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      case 'Shopping & Retail': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      default: return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-50 text-lg">AI Categorization Complete</h3>
            <p className="text-xs text-slate-400">Expense Analysis Output</p>
          </div>
        </div>

        <div className={`px-4 py-1.5 rounded-xl border text-xs font-semibold font-mono tracking-wide w-fit ${getCategoryColor(category)}`}>
          {category}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
          <div className="text-xs text-slate-400 flex items-center space-x-1">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Expense Name</span>
          </div>
          <div className="text-base font-bold text-slate-100 truncate">{expenseName}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
          <div className="text-xs text-slate-400 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Amount</span>
          </div>
          <div className="text-base font-bold text-emerald-400">{`₹${Number(amount).toFixed(2)}`}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
          <div className="text-xs text-slate-400 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Confidence Score</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-base font-bold text-blue-400 font-mono">{`₹{confidencePercent}%`}</span>
            <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-400 h-full rounded-full transition-all duration-500"
                style={{ width: `₹{confidencePercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>AI Categorization Reasoning</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {reason}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 font-mono border-t border-slate-800/60">
        <div>Agent: <span className="text-slate-400">Expense Categorizer</span></div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(createdAt || Date.now()).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
