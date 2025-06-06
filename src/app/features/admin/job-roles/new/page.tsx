"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";

import JobRoleForm from "../JobRoleForm";
import { handleCreate } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { CreateJobRole, JobRoleResponse } from "../JobRoleTypes";
import { uiTheme } from "@/app/lib/uiConfig";

export default function CreateJobRolePage() {
  useRequireRoles(["Admin"]);
  const router = useRouter();

  const handleSubmit = async (data: CreateJobRole) => {
    await handleCreate<CreateJobRole, JobRoleResponse>(
      "/api/job-roles/create",
      data,
      "Job Role",
      () => router.push("/features/admin/job-roles")
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create New Job Role"
        actions={
          <Link href="/features/admin/job-roles">
            <Button size="sm" className={uiTheme.buttons.back}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <JobRoleForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create Job Role"
        />
      </div>
    </PageContainer>
  );
}
