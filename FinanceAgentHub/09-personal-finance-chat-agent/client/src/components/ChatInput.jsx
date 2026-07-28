import React, { useState } from 'react';
import { Send, Mic, RefreshCw } from 'lucide-react';
import { useVoiceInput } from '../hooks/useVoiceInput.js';

export default function ChatInput({ onSendMessage, loading }) {
  const [text, setText] = useState('');

  const { isListening, toggleListening } = useVoiceInput((transcript) => {
    setText((prev) => (prev ? `₹{prev} ${transcript}` : transcript));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-xl">
      <button
        type="button"
        onClick={toggleListening}
        className={`p-3 rounded-xl border transition-all ${
          isListening
            ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-cyan-400'
        }`}
        title="Toggle Voice Microphone (Voice Ready)"
      >
        <Mic className="w-5 h-5" />
      </button>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask a personal finance question..."
        className="flex-1 bg-transparent px-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
      />

      <button
        type="submit"
        disabled={!text.trim() || loading}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white p-3 rounded-xl shadow-lg transition-all"
      >
        {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
      </button>
    </form>
  );
}
