import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, Activity, Home, LayoutDashboard, Terminal } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-xl group-hover:border-cyan-400/60 transition-all">
            <Bot className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="font-bold text-slate-100 text-base tracking-tight leading-none">Personal Finance Chat Agent</div>
            <div className="text-[10px] text-cyan-400 font-mono tracking-wide mt-0.5">FinanceAgentHub</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-800">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-all ${
              isActive('/') 
                ? 'bg-slate-800 text-cyan-400 font-semibold' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-all ${
              isActive('/dashboard') 
                ? 'bg-slate-800 text-cyan-400 font-semibold' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/agent"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-all ${
              isActive('/agent') 
                ? 'bg-slate-800 text-cyan-400 font-semibold' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>AI Console</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono font-medium text-emerald-400">Server :5009</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
          Client :3009
        </div>
      </div>
    </nav>
  );
}
