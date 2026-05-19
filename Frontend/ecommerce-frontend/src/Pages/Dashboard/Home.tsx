import { 
  Users, UserCheck, UserMinus, DollarSign, 
  Package, ShoppingCart, Tags, Activity, TrendingUp 
} from 'lucide-react';
import type { StatCard } from '../../types/index';

const stats: StatCard[] = [
  { title: 'Total Admin', count: '12', icon: Users, trend: '+2 this week', isPositive: true, color: 'from-blue-500/20 to-blue-600/5 text-blue-400' },
  { title: 'Total Users', count: '8,439', icon: UserCheck, trend: '+14% this month', isPositive: true, color: 'from-indigo-500/20 to-indigo-600/5 text-indigo-400' },
  { title: 'Total Earnings', count: '$42,500', icon: DollarSign, trend: '+8.2% this week', isPositive: true, color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400' },
  { title: 'Active Users', count: '1,200', icon: Activity, trend: 'Stable', isPositive: true, color: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400' },
  { title: 'Total Products', count: '450', icon: Package, trend: '+24 new', isPositive: true, color: 'from-purple-500/20 to-purple-600/5 text-purple-400' },
  { title: 'Total Orders', count: '1,245', icon: ShoppingCart, trend: '+3% today', isPositive: true, color: 'from-pink-500/20 to-pink-600/5 text-pink-400' },
  { title: 'Categories', count: '32', icon: Tags, trend: 'No change', isPositive: true, color: 'from-amber-500/20 to-amber-600/5 text-amber-400' },
  { title: 'Inactive Users', count: '430', icon: UserMinus, trend: '-2% this month', isPositive: false, color: 'from-red-500/20 to-red-600/5 text-red-400' },
];

export const Home = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back, here's what's happening today.</p>
        </div>
      </div>

      {/* Glassmorphism Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 hover:bg-slate-800/40 transition-all duration-300 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-1 tracking-tight">{stat.count}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <TrendingUp size={14} className={stat.isPositive ? 'text-emerald-400' : 'text-red-400 rotate-180'} />
              <span className={stat.isPositive ? 'text-emerald-400' : 'text-red-400'}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Sections (Charts & Tables) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dummy Chart Placeholder */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Revenue Analytics</h3>
          <div className="h-64 flex items-end justify-between gap-2 opacity-70">
            {/* Generating dummy bars for visualization */}
            {[40, 70, 45, 90, 65, 85, 120, 50, 80, 100, 60, 110].map((h, i) => (
              <div key={i} className="w-full bg-linear-to-t from-indigo-500/20 to-indigo-400 rounded-t-md hover:from-indigo-400 hover:to-indigo-300 transition-colors cursor-pointer" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Latest Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                <div>
                  <p className="text-sm font-medium text-slate-300">New user registered</p>
                  <p className="text-xs text-slate-500">2 minutes ago • ID: USR-{9843 + i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};