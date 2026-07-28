import React from 'react';
import { Activity, ShieldCheck, Cpu } from 'lucide-react';

export default function ConnectedAgentsGrid({ agents = [] }) {
  if (!agents || agents.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-base">Connected Multi-Agent Network</h3>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-bold">
          9 Child Microservices Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {agents.map((agent, idx) => (
          <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-200 truncate max-w-[160px]">{agent.name}</div>
              <div className="text-[10px] font-mono text-slate-500">Port :{agent.port}</div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono text-cyan-400">{agent.latencyMs || 15}ms</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
