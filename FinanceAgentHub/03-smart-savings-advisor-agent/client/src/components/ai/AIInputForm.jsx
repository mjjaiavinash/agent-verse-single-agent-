import React, { useState } from 'react';
import { Send, Sparkles, Sliders, Paperclip, RefreshCw } from 'lucide-react';

export default function AIInputForm({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);

  const presets = [
    'Analyze current financial trends and summarize key takeaways.',
    'Evaluate risk metrics and suggest optimization steps.',
    'Run agent diagnostics and generate a standard status report.'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    onSubmit({ prompt, temperature, maxTokens });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-slate-100 text-base">Invoke Smart Savings Advisor Agent</h3>
        </div>
        <div className="text-xs text-slate-400 font-mono">Groq AI Engine</div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Agent Prompt Payload</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt instructions or input payload for this AI agent..."
          rows={4}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
        />
      </div>

      <div className="space-y-2">
        <div className="text-xs text-slate-400 font-medium">Quick Presets:</div>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPrompt(preset)}
              className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg transition-all text-left"
            >
              "{preset}"
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="text-xs text-slate-400 flex items-center justify-between mb-1">
            <span>Temperature</span>
            <span className="font-mono text-cyan-400">{temperature}</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-950 h-1.5 rounded-lg"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 flex items-center justify-between mb-1">
            <span>Max Tokens</span>
            <span className="font-mono text-cyan-400">{maxTokens}</span>
          </label>
          <input
            type="range"
            min="256"
            max="4096"
            step="256"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-950 h-1.5 rounded-lg"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-end">
        <button
          type="submit"
          disabled={!prompt.trim() || loading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Execute Task</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
