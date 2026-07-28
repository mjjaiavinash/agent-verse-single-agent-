import React from 'react';
import { Calendar, Activity } from 'lucide-react';

export default function SpendingHeatmap({ heatmap = [] }) {
  if (!heatmap || heatmap.length === 0) return null;

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 5: return 'bg-rose-500 text-white border-rose-400';
      case 4: return 'bg-amber-500 text-slate-950 border-amber-400 font-bold';
      case 3: return 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold';
      case 2: return 'bg-blue-500/40 text-blue-200 border-blue-500/30';
      default: return 'bg-slate-950 text-slate-500 border-slate-800';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-slate-100 text-base">Weekly Spending Heatmap</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          7-Day Outflow Intensity
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {heatmap.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${getIntensityColor(item.intensity)}`}
          >
            <span className="text-xs font-bold font-mono">{item.day}</span>
            <span className="text-[10px] uppercase font-mono opacity-80">Lvl {item.intensity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
