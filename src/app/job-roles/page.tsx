"use client";
import RoleTable from "./RoleTable";

export default function Page() {
  const { user } = useRequireRoles(["Admin"]);
  return <RoleTable />;
}
