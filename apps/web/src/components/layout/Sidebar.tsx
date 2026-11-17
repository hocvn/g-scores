import {
  LayoutDashboard,
  Search,
  FileBarChart,
  Settings,
  GraduationCap,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Search Scores", href: "/scores", icon: Search },
  { name: "Reports", href: "/reports", icon: FileBarChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64
          border-r border-slate-200 bg-white
          transition-transform duration-200
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2.5 text-white">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              G-Scores
            </span>
          </div>

          <button
            className="text-slate-500 lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-1 px-3 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3
                   text-sm font-medium transition-colors
                   ${
                     isActive
                       ? "bg-indigo-50 text-indigo-700"
                       : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                   }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
