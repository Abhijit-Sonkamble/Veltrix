import { Save, UserPlus } from "lucide-react";

export const AddAdmin = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <UserPlus className="text-indigo-400" /> Add New Admin
        </h1>
        <button className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-cyan-500 text-white px-5 py-2 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
          <Save size={18} /> Save Admin
        </button>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter admin name"
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@company.com"
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Admin Role
            </label>
            <select className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500/50 appearance-none">
              <option value="manager">Manager</option>
              <option value="editor">Editor</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
