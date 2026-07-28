import React from 'react';
import { Bot, User, Volume2 } from 'lucide-react';

export default function ChatThread({ messages = [] }) {
  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
      {messages.map((msg, idx) => {
        const isBot = msg.sender === 'assistant';
        return (
          <div
            key={idx}
            className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
          >
            <div className={`p-2 rounded-xl border shrink-0 ${isBot ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-blue-600/10 border-blue-500/30 text-blue-400'}`}>
              {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>

            <div className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed border space-y-2 ${
              isBot
                ? 'bg-slate-900 border-slate-800 text-slate-100'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-500 text-white shadow-lg'
            }`}>
              <div className="whitespace-pre-wrap font-sans">
                {msg.message}
              </div>

              {isBot && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-[11px] text-slate-400 font-mono">
                  <span>Groq Llama-3 AI</span>
                  <button
                    onClick={() => speakMessage(msg.message)}
                    className="hover:text-cyan-400 flex items-center space-x-1"
                    title="Read aloud (Voice Ready)"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
