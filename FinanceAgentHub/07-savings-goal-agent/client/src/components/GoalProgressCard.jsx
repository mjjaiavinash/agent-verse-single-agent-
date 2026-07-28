import React from 'react';
import { Target, Calendar, Clock, DollarSign } from 'lucide-react';

export default function GoalProgressCard({ result }) {
  if (!result) return null;

  const { goalName, targetAmount, currentSavings, progressPercentage, remainingAmount, monthsToCompletion, completionDate } = result;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-50 text-lg">{goalName}</h3>
            <p className="text-xs text-slate-400">Target Savings Goal Tracker</p>
          </div>
        </div>

        <div className="px-4 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-semibold font-mono tracking-wide w-fit flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Projected ETA: {completionDate}</span>
        </div>
      </div>

      {/* Main Goal Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Current Progress</span>
          <span className="text-emerald-400 font-bold text-sm">{`${progressPercentage}%`}</span>
        </div>

        <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-700 shadow-lg shadow-emerald-500/20"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Saved: ${`${Number(currentSavings).toLocaleString()}`}</span>
          <span>Target: ${`${Number(targetAmount).toLocaleString()}`}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Remaining Amount</span>
          </div>
          <div className="text-xl font-bold text-amber-400 font-mono">
            ${`${Number(remainingAmount).toLocaleString()}`}
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Time to Completion</span>
          </div>
          <div className="text-xl font-bold text-cyan-400 font-mono">
            {`${monthsToCompletion} Months`}
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Completion Date</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            {completionDate}
          </div>
        </div>
      </div>
    </div>
  );
}
