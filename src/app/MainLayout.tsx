"use client";

import Sidebar from "./dashboard/nav-bar/SideBar";
import { uiTheme } from "@/app/lib/uiConfig";

// src/app/MainLayout.tsx

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main
        className={`${uiTheme.colors.contentBg} flex-1 p-6 overflow-y-auto`}
      >
        {children}
      </main>
    </div>
  );
}
