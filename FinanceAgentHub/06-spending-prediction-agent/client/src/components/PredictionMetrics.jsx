import React from 'react';
import { DollarSign, ShieldCheck, TrendingUp, Cpu } from 'lucide-react';

export default function PredictionMetrics({ result }) {
  if (!result) return null;

  const { predictedNextMonthSpending, confidenceScore, expectedMonthlySavings, expectedAnnualSavings, financialRiskLevel } = result;

  const confPercent = Math.round((confidenceScore || 0.94) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Predicted Next Month</span>
          <DollarSign className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-2xl font-bold text-slate-100 font-mono">
          {`₹${Number(predictedNextMonthSpending || 0).toFixed(2)}`}
        </div>
        <div className="text-[11px] text-slate-500">Forecasted Outflow</div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Confidence Score</span>
          <Cpu className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-bold text-emerald-400 font-mono">
          {`₹{confPercent}%`}
        </div>
        <div className="text-[11px] text-slate-500">AI Predictive Accuracy</div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Expected Savings</span>
          <TrendingUp className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-2xl font-bold text-blue-400 font-mono">
          {`₹${Number(expectedMonthlySavings || 0).toFixed(0)}/mo`}
        </div>
        <div className="text-[11px] text-slate-500">Proj. Annual: {`₹${Number(expectedAnnualSavings || 0).toLocaleString()}`}</div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Financial Risk</span>
          <ShieldCheck className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-2xl font-bold text-amber-400 font-mono">
          {financialRiskLevel || 'Low'}
        </div>
        <div className="text-[11px] text-slate-500">Cash Flow Exposure</div>
      </div>
    </div>
  );
}
