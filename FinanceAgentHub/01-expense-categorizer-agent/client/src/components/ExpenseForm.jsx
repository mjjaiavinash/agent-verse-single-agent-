import React, { useState } from 'react';
import { Tag, DollarSign, FileText, Sparkles, RefreshCw, Layers } from 'lucide-react';

export default function ExpenseForm({ onSubmit, loading }) {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const samplePresets = [
    { name: 'Starbucks Coffee', amount: '350', desc: 'Iced caramel macchiato & blueberry muffin' },
    { name: 'Uber Ride to Airport', amount: '750', desc: 'Commute to Airport' },
    { name: 'Netflix Plan', amount: '499', desc: 'Monthly Ultra HD streaming plan' },
    { name: 'Grocery Supermarket', amount: '3500', desc: 'Monthly household grocery stock' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expenseName.trim() || !amount || loading) return;
    onSubmit({ expenseName: expenseName.trim(), amount: parseFloat(amount), description: description.trim() });
  };

  const applyPreset = (preset) => {
    setExpenseName(preset.name);
    setAmount(preset.amount);
    setDescription(preset.desc);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Categorize New Expense</h3>
            <p className="text-xs text-slate-400">AI-Powered Transaction Categorization</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Groq AI Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Expense Name *</span>
          </label>
          <input
            type="text"
            required
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            placeholder="e.g. Starbucks, Uber, Chevron"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Expense Amount (₹) *</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          <span>Description (Optional Notes)</span>
        </label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Lunch with business partners, monthly billing..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
        />
      </div>

      <div className="space-y-2 pt-1">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Quick Sample Input Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {samplePresets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => applyPreset(p)}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1.5 rounded-lg transition-all"
            >
              {`${p.name} (₹${p.amount})`}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex justify-end">
        <button
          type="submit"
          disabled={!expenseName.trim() || !amount || loading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing with AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyze & Categorize</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
