import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ArrowRight, Flag, Sparkles, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-12 py-6">
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          <Target className="w-4 h-4" />
          <span>Agent 07 - Savings Goal Agent</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-50 leading-tight">
          Automated Savings Goal & Milestone Tracking
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Track target milestones, projected completion ETAs, remaining balances, and Groq AI goal acceleration recommendations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all"
          >
            <span>Open Goal Tracker Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Progress Tracking</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Real-time percentage progress bars and target completion meters.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Projected Completion ETA</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Calculated months to completion with target completion date forecasts.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">AI Acceleration Tips</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Groq AI strategies to cut months off your goal timeline.
          </p>
        </div>
      </section>
    </div>
  );
}
