import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ this is correct
import { useAuth } from "../components/AuthProvider";

export function useRequireRoles(allowedRoles: string[]) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.push("/login");
    } else if (!allowedRoles.includes(user?.role || "")) {
      router.push("/unauthorized");
    }
  }, [isAuthenticated, user, allowedRoles, router, loading]);

  return { user };
}
