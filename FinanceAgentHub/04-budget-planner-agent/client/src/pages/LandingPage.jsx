import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, ArrowRight, Sliders, Tag, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-12 py-6">
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
          <PieChart className="w-4 h-4" />
          <span>Agent 04 - Budget Planner Agent</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-50 leading-tight">
          Intelligent Monthly Budget Planning
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Generate 50/30/20 category budgets, itemized spending limits, and executive AI recommendations powered by Groq LLMs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-all"
          >
            <span>Open Budget Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit">
            <PieChart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">50/30/20 Framework</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Macro allocation breakdown across Needs, Wants, and Savings targets.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
            <Tag className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Itemized Category Caps</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Detailed spending allocations across housing, food, transportation, and leisure.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
            <Sliders className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Spending Ceilings</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Enforced daily, weekly, and monthly discretionary spending limits.
          </p>
        </div>
      </section>
    </div>
  );
}
