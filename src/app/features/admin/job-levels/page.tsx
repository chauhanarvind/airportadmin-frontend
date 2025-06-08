"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";

import JobLevelTable from "./JobLevelTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

export default function JobLevelsPage() {
  useRequireRoles(["Admin"]);

  return (
    <PageContainer>
      <PageHeader
        title="Job Level Management"
        actions={
          <Link href="/features/admin/job-levels/new">
            <Button className={uiTheme.colors.primary}>Add New Level</Button>
          </Link>
        }
      />

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <JobLevelTable />
      </div>
    </PageContainer>
  );
}
