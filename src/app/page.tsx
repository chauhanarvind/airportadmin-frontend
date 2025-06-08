"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./components/AuthProvider";
import PageLoader from "./components/ui/PageLoader";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Explicit null check
    if (user !== undefined) {
      if (user) {
        router.replace("/features");
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading]);

  return <PageLoader />;
}
