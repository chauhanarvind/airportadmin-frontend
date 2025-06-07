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

    if (user) {
      router.replace("/features"); // or /admin etc. based on role
    } else {
      router.replace("/login");
    }
  }, [user, loading]);

  return <PageLoader />;
}
