"use client";

import { useRequireRoles } from "../lib/useRequireRoles";
import UserTable from "./UserTable";

export default function Page() {
  const { user } = useRequireRoles(["Admin", "Supervisor", "Manager"]);

  return <UserTable />;
}
