import { Save, Layers } from "lucide-react";

export const AddSubCategory = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="text-indigo-400" /> Create SubCategory
        </h1>
        <button className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-cyan-500 text-white px-5 py-2 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
          <Save size={18} /> Save SubCategory
        </button>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            SubCategory Name
          </label>
          <input
            type="text"
            placeholder="e.g., Smartphones"
            className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Parent Category
          </label>
          <select className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 appearance-none">
            <option value="">-- Select Parent Category --</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="appliances">Home Appliances</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Description (Optional)
          </label>
          <textarea
            rows={4}
            placeholder="Brief description..."
            className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 custom-scrollbar"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Status
          </label>
          <select className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 appearance-none">
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
    </div>
  );
};
