"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserTable from "./UserTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

export default function UsersPage() {
  useRequireRoles(["Admin", "Supervisor", "Manager"]);

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>User Management</h1>
        <Link href="/dashboard/users/new">
          <Button className={uiTheme.colors.primary}>Add New User</Button>
        </Link>
      </div>

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <UserTable />
      </div>
    </div>
  );
}
