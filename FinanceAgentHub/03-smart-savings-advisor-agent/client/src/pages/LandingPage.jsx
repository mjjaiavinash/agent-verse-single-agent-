import React from 'react';
import { Link } from 'react-router-dom';
import { PiggyBank, ArrowRight, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-12 py-6">
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          <PiggyBank className="w-4 h-4" />
          <span>Agent 03 - Smart Savings Advisor</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-50 leading-tight">
          Personalized AI Savings & Capital Optimization
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Generate actionable cost-reduction tips, estimated annual savings projections, AI recommendations, and financial risk alerts powered by Groq LLMs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all"
          >
            <span>Open Advisor Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Actionable Cost Tips</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Customized micro-savings tips with dollar valuations tailored to your cash flow.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">AI Recommendations</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            High-yield APY moves and automated monthly investment allocation strategies.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Financial Risk Warnings</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Real-time warnings on high debt-to-income ratios and emergency buffer deficits.
          </p>
        </div>
      </section>
    </div>
  );
}
