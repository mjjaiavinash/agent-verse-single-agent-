import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function SuggestedQuestions({ onSelectQuestion }) {
  const questions = [
    'How do I build a 6-month emergency reserve fund?',
    'What is the 50/30/20 budgeting rule?',
    'Should I pay off debt or invest surplus cash first?',
    'How do high-yield savings accounts (HYSA) compound interest?',
  ];

  return (
    <div className="space-y-2">
      <div className="text-xs text-slate-400 font-medium flex items-center space-x-1">
        <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
        <span>Suggested Financial Queries:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectQuestion(q)}
            className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1.5 rounded-xl transition-all text-left"
          >
            "{q}"
          </button>
        ))}
      </div>
    </div>
  );
}
