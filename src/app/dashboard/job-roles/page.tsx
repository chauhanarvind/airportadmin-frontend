"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import JobRoleTable from "./JobRoleTable";

export default function JobRolesPage() {
  useRequireRoles(["Admin"]);

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>Job Role Management</h1>
        <Link href="/dashboard/job-roles/new">
          <Button className={uiTheme.colors.primary}>Add New Job Role</Button>
        </Link>
      </div>

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <JobRoleTable />
      </div>
    </div>
  );
}
