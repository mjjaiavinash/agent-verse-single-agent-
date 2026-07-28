import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext.jsx';
import ToastContainer from './components/ui/Toast.jsx';
import Navigation from './components/layout/Navigation.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
          <Navigation />
          <div className="flex-1 flex">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/agent" element={<Dashboard />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
          <ToastContainer />
        </div>
      </Router>
    </ToastProvider>
  );
}
