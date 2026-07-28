import React, { useState } from 'react';
import { TrendingUp, Sparkles, RefreshCw, Calendar, FileText } from 'lucide-react';

export default function SpendingForm({ onSubmit, loading }) {
  const [timeframe, setTimeframe] = useState('Monthly');
  const [rawText, setRawText] = useState(
    `Starbucks Coffee - ₹12.50
Whole Foods Market - ₹145.00
Uber Commute - ₹35.00
Monthly Apartment Rent - ₹1400.00
Amazon Electronics - ₹210.00
Netflix Subscription - ₹19.99
Shell Gas Station - ₹48.50`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    // Parse simple text lines into structured transactions
    const lines = rawText.split('\n').filter(l => l.trim().length > 0);
    const transactions = lines.map(line => {
      const parts = line.split('-');
      const name = parts[0]?.trim() || 'Expense Item';
      const amtStr = parts[1]?.replace(/[^0-9.]/g, '') || '25.00';
      return {
        expenseName: name,
        amount: parseFloat(amtStr) || 25.00,
      };
    });

    onSubmit({ transactions, timeframe });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Analyze Spending History</h3>
            <p className="text-xs text-slate-400">Pattern Recognition & Behavioral Analytics</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400 px-3 py-1.5 rounded-xl focus:outline-none focus:border-cyan-500"
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>Transactions Dataset (Name - Amount)</span>
        </label>
        <textarea
          rows={6}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Paste or enter transactions lines: Vendor - $Amount..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none leading-relaxed"
        />
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <div className="text-xs text-slate-500 font-mono">
          Items detected: {rawText.split('\n').filter(l => l.trim()).length}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Trends...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Pattern Insights</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
