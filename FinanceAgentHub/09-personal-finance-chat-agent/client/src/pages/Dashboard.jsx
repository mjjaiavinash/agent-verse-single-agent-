import React, { useState, useEffect } from 'react';
import ChatThread from '../components/ChatThread.jsx';
import ChatInput from '../components/ChatInput.jsx';
import SuggestedQuestions from '../components/SuggestedQuestions.jsx';
import TypingIndicator from '../components/TypingIndicator.jsx';
import ErrorComponent from '../components/ui/ErrorComponent.jsx';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import { MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const fetchHistory = async () => {
    try {
      const res = await api.get('/history');
      if (res.data?.result && res.data.result.length > 0) {
        setMessages(res.data.result);
      } else {
        setMessages([
          {
            sender: 'assistant',
            message: "Hello! I am your **Personal Finance Chat Assistant**. Ask me anything about budgeting, emergency funds, debt payoff, or savings strategies!",
          }
        ]);
      }
    } catch (err) {
      console.warn('Failed to load chat history:', err.message);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSendMessage = async (text) => {
    const userMsg = { sender: 'user', message: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/chat', { message: text });
      const botResponse = res.data?.result?.botResponse || "Response generated.";
      setMessages((prev) => [...prev, { sender: 'assistant', message: botResponse }]);
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message || 'Chat request failed';
      setError({ message: msg, stack: err.stack });
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">Personal Finance AI Chat Assistant</h1>
            <p className="text-sm text-slate-400">Interactive Conversational Agent (Port 3008 / Server 5008)</p>
          </div>
        </div>

        <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
          Groq LLM + Voice Ready
        </span>
      </div>

      {/* Suggested Questions */}
      <SuggestedQuestions onSelectQuestion={handleSendMessage} />

      {/* Main Chat Thread Box */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <ChatThread messages={messages} />
        {loading && <TypingIndicator />}
      </div>

      {/* Error Component */}
      {error && (
        <ErrorComponent
          title="Chat Assistant Error"
          message={error.message}
          stack={error.stack}
          onRetry={() => setError(null)}
        />
      )}

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} loading={loading} />
    </div>
  );
}
