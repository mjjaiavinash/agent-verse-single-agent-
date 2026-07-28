import React, { useState } from 'react';
import { Copy, Check, Terminal, Clock, Cpu, FileCode, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export default function AIOutputCard({ result }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('formatted');
  const { showToast } = useToast();

  if (!result) return null;

  const handleCopy = () => {
    const textToCopy = typeof result.content === 'object' 
      ? JSON.stringify(result.content, null, 2) 
      : String(result.content || result.message || '');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Result copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-slate-100 text-base">Execution Result</h3>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('formatted')}
              className={`px-3 py-1 rounded-md transition-all ${activeTab === 'formatted' ? 'bg-slate-800 text-cyan-400 font-semibold' : 'text-slate-400'}`}
            >
              Formatted
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1 rounded-md transition-all ${activeTab === 'json' ? 'bg-slate-800 text-cyan-400 font-semibold' : 'text-slate-400'}`}
            >
              Raw JSON
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-all"
            title="Copy content"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
        <div className="flex items-center space-x-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Agent: <strong className="text-slate-200">Savings Goal Agent</strong></span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>Execution: <strong className="text-slate-200">{result.executionTimeMs || 120}ms</strong></span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="flex items-center space-x-1.5">
          <FileCode className="w-3.5 h-3.5 text-emerald-400" />
          <span>Status: <strong className="text-emerald-400">Success</strong></span>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 overflow-x-auto text-sm text-slate-200 font-sans leading-relaxed">
        {activeTab === 'formatted' ? (
          <div className="whitespace-pre-wrap">
            {typeof result.content === 'string' ? result.content : JSON.stringify(result, null, 2)}
          </div>
        ) : (
          <pre className="font-mono text-xs text-cyan-300">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
