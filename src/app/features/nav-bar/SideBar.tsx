"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, ChevronLeft } from "lucide-react";
import { useAuth } from "@/app/components/AuthProvider";
import { uiTheme } from "@/app/lib/uiConfig";
import { navItems } from "./navConfig";
import LogoutDialog from "@/app/components/ui/LogoutDialog";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  // Filter based on roles (top-level and nested items)
  const filteredNav = navItems
    .filter(
      (item) => !item.roles || item.roles.includes(user.role) || item.children // keep parent if any child is allowed
    )
    .map((item) => ({
      ...item,
      children: item.children?.filter(
        (child) => !child.roles || child.roles.includes(user.role)
      ),
    }));

  return (
    <aside
      className={`fixed top-0 left-0 h-screen overflow-y-auto z-30 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } ${uiTheme.sidebar}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <span className="font-bold text-lg">{user.role} Panel</span>
        )}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      {/* Navigation Items */}
      <nav className="p-2 space-y-1">
        {filteredNav.map(({ label, href, icon: Icon, children }) => {
          // Simple item
          if (!children) {
            if (!href) return null;
            const isActive = href && pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                  isActive ? uiTheme.nav.active : uiTheme.nav.inactive
                }`}
              >
                <Icon size={20} />
                {!collapsed && <span className="text-sm">{label}</span>}
              </Link>
            );
          }

          // Parent with submenu
          return (
            <div key={label}>
              <div className="flex items-center gap-3 px-2 py-2 font-medium text-gray-700">
                <Icon size={20} />
                {!collapsed && <span className="text-sm">{label}</span>}
              </div>
              {!collapsed && (
                <div className="ml-8 space-y-1">
                  {children.map((child) => {
                    const isActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block text-sm rounded-md px-2 py-1 transition-colors ${
                          isActive ? uiTheme.nav.active : uiTheme.nav.inactive
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {/* Logout Button */}
      <LogoutDialog
        onConfirm={logout}
        trigger={
          <button className="flex items-center gap-3 text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
            <Menu size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        }
      />
    </aside>
  );
}
