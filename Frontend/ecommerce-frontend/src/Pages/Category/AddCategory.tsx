import { Save, Tags, UploadCloud } from 'lucide-react';

export const AddCategory = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Tags className="text-indigo-400" /> Create Category
        </h1>
        <button className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-cyan-500 text-white px-5 py-2 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
          <Save size={18} /> Save Category
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Category Name</label>
            <input type="text" placeholder="e.g., Electronics" className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
            <textarea rows={4} placeholder="Brief description of this category..." className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 custom-scrollbar"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Category Image / Icon</label>
            <div className="border-2 border-dashed border-slate-700/50 rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors group relative overflow-hidden">
              <UploadCloud size={40} className="mx-auto text-slate-500 mb-3 group-hover:text-indigo-400 transition-colors" />
              <p className="text-sm text-slate-300 font-medium">Click or drag image to upload</p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG, SVG up to 2MB</p>
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};