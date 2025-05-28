"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import JobCategoryTable from "./JobCategoryTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

export default function JobCategoriesPage() {
  useRequireRoles(["Admin"]);

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>Job Category Management</h1>
        <Link href="/dashboard/job-categories/new">
          <Button className={uiTheme.colors.primary}>Add New Category</Button>
        </Link>
      </div>

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <JobCategoryTable />
      </div>
    </div>
  );
}
