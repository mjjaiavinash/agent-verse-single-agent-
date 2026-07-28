import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Terminal, Cpu, Settings, BookOpen, Activity, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const links = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Agent Console', path: '/agent', icon: Terminal },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/50 min-h-[calc(100vh-61px)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-2 font-semibold">Navigation</div>
          <div className="space-y-1">
            {links.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-4 h-4 text-cyan-400" />}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-3 mb-2 font-semibold">Agent Details</div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Model Engine</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800/60">
              Groq / Llama-3-70b
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Status</span>
              <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Ready</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60 text-xs text-slate-500 space-y-1">
        <div className="font-semibold text-slate-400">Savings Goal Agent</div>
        <div>Version 1.0.0 (Clean Architecture)</div>
      </div>
    </aside>
  );
}
