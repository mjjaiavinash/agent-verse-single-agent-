import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Cpu, Layers } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

export default function MasterResponseCard({ result }) {
  const [activeTab, setActiveTab] = useState('synthesized');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  if (!result) return null;

  const { finalSynthesizedResponse, agentResponses, selectedAgents, totalExecutionTimeMs } = result;

  const handleCopy = () => {
    navigator.clipboard.writeText(finalSynthesizedResponse || '');
    setCopied(true);
    showToast('Synthesized master response copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-50 text-lg">Master Orchestrated AI Synthesis</h3>
            <p className="text-xs text-slate-400">Multi-Agent Aggregation Result</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('synthesized')}
              className={`px-3 py-1 rounded-md transition-all ${activeTab === 'synthesized' ? 'bg-slate-800 text-cyan-400 font-semibold' : 'text-slate-400'}`}
            >
              Master Response
            </button>
            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-3 py-1 rounded-md transition-all ${activeTab === 'breakdown' ? 'bg-slate-800 text-cyan-400 font-semibold' : 'text-slate-400'}`}
            >
              Child Agent Breakdown
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-all"
            title="Copy synthesized response"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <span className="text-slate-500 font-semibold">Invoked Micro-Agents:</span>
        {selectedAgents?.map((a, i) => (
          <span key={i} className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
            {a}
          </span>
        ))}
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto text-sm text-slate-200 leading-relaxed font-sans">
        {activeTab === 'synthesized' ? (
          <div className="whitespace-pre-wrap">
            {finalSynthesizedResponse}
          </div>
        ) : (
          <pre className="font-mono text-xs text-cyan-300">
            {JSON.stringify(agentResponses, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
