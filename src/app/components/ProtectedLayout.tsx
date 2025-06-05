// app/ProtectedLayout.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/components/AuthProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return <>{children}</>;
}
