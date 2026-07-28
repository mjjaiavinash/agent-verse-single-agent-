import React from 'react';
import { History, Tag, DollarSign, Calendar, ShieldCheck } from 'lucide-react';

export default function ExpenseHistory({ history = [] }) {
  if (!history || history.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
        <History className="w-8 h-8 text-slate-600 mx-auto" />
        <h4 className="text-sm font-semibold text-slate-300">No Expense History Yet</h4>
        <p className="text-xs text-slate-500">Analyze an expense above to populate your historical records.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">Categorization History</h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
          {history.length} Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Expense</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {history.map((item, idx) => (
              <tr key={item._id || item.id || idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-100">
                  {item.expenseName}
                  {item.description && <div className="text-[11px] font-normal text-slate-500 truncate max-w-xs">{item.description}</div>}
                </td>
                <td className="px-4 py-3 font-mono text-emerald-400 font-medium">
                  {`₹${Number(item.amount).toFixed(2)}`}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[11px]">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-blue-400">
                  {Math.round((item.confidenceScore || 0.95) * 100)}%
                </td>
                <td className="px-4 py-3 font-mono text-slate-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
