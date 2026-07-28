import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, BarChart3, PieChart, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-12 py-6">
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>Agent 02 - Spending Pattern Analyzer</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-50 leading-tight">
          Behavioral Spending Pattern Analytics
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Uncover financial trends, weekly cash outflow spikes, category concentration, and heatmaps powered by Groq LLMs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-all"
          >
            <span>Launch Pattern Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Weekly & Monthly Trends</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Temporal cash flow analytics revealing spending pacing across 4-week periods.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
            <PieChart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Category Concentration</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Automated percentage share breakdown of spending across financial categories.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">AI Heatmaps & Insights</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            7-day spending intensity heatmaps coupled with Groq AI recommendations.
          </p>
        </div>
      </section>
    </div>
  );
}
