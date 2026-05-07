import {
  Book,
  PlusCircle,
  X,
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";
import useUsers from "../hooks/use-users";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

const Sidebar = ({
  isSidebarOpen,
  closeSidebar,
  activeNav,
  setActiveNav,
}) => {
  const { users } = useUsers();
  return (
    <aside
      className={`bg-white border-r border-slate-200 w-64 fixed top-0 left-0 z-30 flex flex-col h-full transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:relative`}
    >
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold text-indigo-600"></h1>
        </div>
        <button
          onClick={closeSidebar}
          className="lg:hidden text-slate-500 hover:text-slate-800"
        >
          <X size={22} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <p className="text-xs uppercase text-slate-400 font-semibold px-3">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeNav === item.id;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer ${
                active
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
              onClick={() => setActiveNav(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.id === "users" && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {users.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
