"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import JobLevelTable from "./JobLevelTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

export default function JobLevelsPage() {
  useRequireRoles(["Admin"]);

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>Job Level Management</h1>
        <Link href="/dashboard/job-levels/new">
          <Button className={uiTheme.colors.primary}>Add New Level</Button>
        </Link>
      </div>

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <JobLevelTable />
      </div>
    </div>
  );
}
