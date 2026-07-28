import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-extrabold text-slate-100">404 - Page Not Found</h1>
        <p className="text-sm text-slate-400">
          The requested agent endpoint or page route does not exist in this microservice application.
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Link
          to="/"
          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/dashboard"
          className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Agent Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
