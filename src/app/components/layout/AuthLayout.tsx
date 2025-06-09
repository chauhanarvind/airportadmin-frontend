"use client";

import { usePathname } from "next/navigation";
import ProtectedLayout from "../ProtectedLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isProtected = path.startsWith("/features");

  if (isProtected) {
    return <ProtectedLayout>{children}</ProtectedLayout>;
  }

  return <>{children}</>;
}
