"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";

import JobCategoryTable from "./JobCategoryTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

export default function JobCategoriesPage() {
  useRequireRoles(["Admin"]);

  return (
    <PageContainer>
      <PageHeader
        title="Job Category Management"
        actions={
          <Link href="/dashboard/job-categories/new">
            <Button className={uiTheme.colors.primary}>Add New Category</Button>
          </Link>
        }
      />

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <JobCategoryTable />
      </div>
    </PageContainer>
  );
}
