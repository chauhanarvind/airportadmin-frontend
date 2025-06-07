// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedLayout from "./components/ProtectedLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airport Admin",
  description: "Admin system for airport staff management",
};

// Utility to detect protected routes
function isProtectedPath(path: string): boolean {
  return path.startsWith("/features");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {isProtectedPath(path) ? (
            <ProtectedLayout>{children}</ProtectedLayout>
          ) : (
            children
          )}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
