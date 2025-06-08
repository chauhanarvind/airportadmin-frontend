"use client";

import { useState } from "react";
import Sidebar from "./features/nav-bar/SideBar";
import { uiTheme } from "@/app/lib/uiConfig";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      {/* Sidebar is fixed, so it's not inside the flex container anymore */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content area, with dynamic margin-left */}
      <main
        className={`${uiTheme.colors.contentBg} min-h-screen p-6 transition-all duration-300`}
        style={{ marginLeft: collapsed ? "4rem" : "16rem" }} // 4rem = w-16, 16rem = w-64
      >
        {children}
      </main>
    </div>
  );
}
