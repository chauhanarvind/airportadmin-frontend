"use client";
import LevelTable from "./LevelTable";

export default function Page() {
  const { user } = useRequireRoles(["Admin"]);
  return <LevelTable />;
}
