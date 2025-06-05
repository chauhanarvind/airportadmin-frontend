import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthProvider";

export function useRequireRoles(allowedRoles: string[]) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // to avoid effect re-running unnecessarily
  const allowedRoleSet = useMemo(() => new Set(allowedRoles), [allowedRoles]);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push("/login");
    } else if (!user || !allowedRoleSet.has(user.role)) {
      router.push("/unauthorized");
    }
  }, [isAuthenticated, user, allowedRoleSet, router, loading]);

  return { user };
}
