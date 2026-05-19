import React from 'react';
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface Column {
  header: string;
  accessor: string;
  isBadge?: boolean;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ title, columns, data }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold text-slate-200">{title}</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search records..." 
            className="bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 w-full sm:w-64"
          />
          <button className="p-2 border border-slate-700/50 rounded-lg hover:bg-slate-800/50 text-slate-400 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/30 text-slate-400 text-sm uppercase tracking-wider border-b border-slate-800/50">
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 font-medium">{col.header}</th>
              ))}
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20 transition-colors group">
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className="p-4 text-sm text-slate-300">
                    {col.isBadge ? (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        row[col.accessor] === 'Active' || row[col.accessor] === 'Delivered' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : row[col.accessor] === 'Pending' || row[col.accessor] === 'Processing'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {row[col.accessor]}
                      </span>
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
                <td className="p-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-md transition-colors"><Eye size={16} /></button>
                  <button className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-md transition-colors"><Edit size={16} /></button>
                  <button className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
      <div className="p-4 border-t border-slate-800/50 flex justify-between items-center text-sm text-slate-400">
        <span>Showing 1 to 10 of 45 entries</span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-slate-800"><ChevronLeft size={18} /></button>
          <button className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-400">1</button>
          <button className="px-3 py-1 rounded hover:bg-slate-800">2</button>
          <button className="px-3 py-1 rounded hover:bg-slate-800">3</button>
          <button className="p-1 rounded hover:bg-slate-800"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};