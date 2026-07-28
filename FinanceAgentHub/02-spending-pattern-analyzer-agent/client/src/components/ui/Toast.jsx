import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
      default: return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
    }
  };

  const getBorder = (type) => {
    switch (type) {
      case 'success': return 'border-emerald-500/30 bg-emerald-950/40 text-emerald-100';
      case 'error': return 'border-rose-500/30 bg-rose-950/40 text-rose-100';
      case 'warning': return 'border-amber-500/30 bg-amber-950/40 text-amber-100';
      default: return 'border-cyan-500/30 bg-cyan-950/40 text-cyan-100';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto border backdrop-blur-md rounded-xl p-4 shadow-2xl flex items-start space-x-3 ${getBorder(toast.type)}`}
          >
            {getIcon(toast.type)}
            <div className="flex-1 text-sm font-medium leading-snug">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
