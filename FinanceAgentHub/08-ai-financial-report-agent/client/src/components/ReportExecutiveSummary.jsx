import React from 'react';
import { FileText, Download, Calendar, Printer } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

export default function ReportExecutiveSummary({ result }) {
  const { showToast } = useToast();

  if (!result) return null;

  const { reportMonth, executiveSummary } = result;

  const handleDownloadPDF = () => {
    window.print();
    showToast('Preparing printable PDF format...', 'info');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 print:bg-white print:text-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 print:border-black">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 print:hidden">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-50 text-lg print:text-black">Executive Financial Summary</h3>
            <p className="text-xs text-slate-400 print:text-gray-600">Reporting Period: <span className="font-semibold text-cyan-400 print:text-black">{reportMonth}</span></p>
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-2 transition-all print:hidden shadow-lg"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export / Download PDF</span>
        </button>
      </div>

      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-sans print:bg-gray-100 print:text-black">
        {executiveSummary}
      </div>
    </div>
  );
}
