import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Tags,
  Layers,
  PackageSearch,
  ShoppingCart,
  LogOut,
  ChevronDown,
  Menu,
  Search,
  Bell,
  Settings,
  UserCircle,
  Boxes,
} from "lucide-react";
import type { MenuItem } from "../../types/index";
import { allRoutes } from "../../routes/route";

export const AppLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: `${allRoutes.dashboard}`,
    },
    {
      title: "Admin",
      icon: UserCog,
      children: [
        { title: "Add Admin", path: allRoutes.addAdmin },
        { title: "View Admin", path: allRoutes.viewAdmin },
      ],
    },
    {
      title: "User",
      icon: Users,
      children: [
        { title: "Add User", path: allRoutes.addUser },
        { title: "View User", path: allRoutes.viewUser },
      ],
    },
    {
      title: "Category",
      icon: Tags,
      children: [
        { title: "Add Category", path: allRoutes.addCategory },
        { title: "View Category", path: allRoutes.viewCategory },
      ],
    },
    {
      title: "Sub Category",
      icon: Layers,
      children: [
        { title: "Add Sub Category", path: allRoutes.addSubcategory },
        { title: "View Sub Category", path: allRoutes.viewSubcategory },
      ],
    },
    {
      title: "Extra Category",
      icon: Boxes,
      children: [
        { title: "Add Extra Category", path: allRoutes.addExtracategory },
        { title: "View Extra Category", path: allRoutes.viewExtracategory },
      ],
    },
    {
      title: "Products",
      icon: PackageSearch,
      children: [
        { title: "Add Products", path: allRoutes.addProduct },
        { title: "View Products", path: allRoutes.ViewProducts},
      ],
    },
    { title: "Orders", icon: ShoppingCart, path: allRoutes.orders },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-72" : "w-20"} transition-all duration-300 ease-in-out flex flex-col bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 z-20`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/50">
          {isSidebarOpen && (
            <span className="text-xl font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              E-AdminPanel
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setExpandedMenu(
                        expandedMenu === item.title ? null : item.title,
                      )
                    }
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${expandedMenu === item.title ? "bg-indigo-500/10 text-indigo-400" : "hover:bg-slate-800/50 text-slate-400"}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      {isSidebarOpen && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </div>
                    {isSidebarOpen && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${expandedMenu === item.title ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                  {isSidebarOpen && expandedMenu === item.title && (
                    <div className="mt-1 ml-4 pl-4 border-l border-slate-800 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block p-2 rounded-lg text-sm transition-all duration-200 ${location.pathname === child.path ? "bg-indigo-500/20 text-indigo-300" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/30"}`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path || "#"}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${location.pathname === item.path ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" : "hover:bg-slate-800/50 text-slate-400"}`}
                >
                  <item.icon size={20} />
                  {isSidebarOpen && (
                    <span className="font-medium">{item.title}</span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/login");
            }}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
        </div>

        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-slate-900/30 backdrop-blur-md border-b border-slate-800/50 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64 group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-full py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-800/50 text-slate-400 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full border border-slate-900"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-slate-800/50 text-slate-400 transition-colors">
              <Settings size={20} />
            </button>
            <div className="h-8 w-px bg-slate-800/50 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-indigo-500 to-cyan-500 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <UserCircle size={24} className="text-slate-300" />
                </div>
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">
                  Super Admin
                </p>
                <p className="text-xs text-slate-500">admin@system.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6 z-0 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
