import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export default function ScoreGauge({ score = 84, grade = 'A', riskLevel = 'Low' }) {
  const getScoreColor = (sc) => {
    if (sc >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
    if (sc >= 70) return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30';
    if (sc >= 55) return 'text-amber-400 border-amber-500/40 bg-amber-950/30';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/30';
  };

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center space-y-4 text-center">
      <div className="relative flex items-center justify-center">
        {/* Radial Progress Circle SVG */}
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="54"
            className="stroke-slate-800"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r="54"
            className="stroke-emerald-400 transition-all duration-1000 ease-out"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Score & Grade Display */}
        <div className="absolute flex flex-col items-center justify-center space-y-0.5">
          <span className="text-4xl font-extrabold font-mono text-slate-100">{score}</span>
          <span className="text-xs font-mono text-slate-400">OUT OF 100</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className={`px-3 py-1 rounded-xl border text-xs font-bold font-mono ${getScoreColor(score)}`}>
          Grade: {grade}
        </div>

        <div className="px-3 py-1 rounded-xl border border-slate-800 bg-slate-950 text-xs font-medium font-mono text-slate-300">
          Risk: <span className="text-emerald-400 font-bold">{riskLevel}</span>
        </div>
      </div>
    </div>
  );
}
