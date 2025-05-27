"use client";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import CategoryTable from "./CategoryTable";

export default function Page() {
  const { user } = useRequireRoles(["Admin"]);
  return <CategoryTable />;
}
