"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import JobRoleTable from "./JobRoleTable";

export default function JobRolesPage() {
  useRequireRoles(["Admin"]);

  return (
    <PageContainer>
      <PageHeader
        title="Job Role Management"
        actions={
          <Link href="/features/job-roles/new">
            <Button className={uiTheme.colors.primary}>Add New Job Role</Button>
          </Link>
        }
      />

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <JobRoleTable />
      </div>
    </PageContainer>
  );
}
