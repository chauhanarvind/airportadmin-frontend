"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import JobRoleForm from "../JobRoleForm";
import { handleCreate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { CreateJobRole, JobRoleResponse } from "../JobRoleTypes";

export default function CreateJobRolePage() {
  useRequireRoles(["Admin"]);
  const router = useRouter();

  const handleSubmit = async (data: CreateJobRole) => {
    await handleCreate<CreateJobRole, JobRoleResponse>(
      "/api/job-roles/create",
      data,
      "Job Role",
      () => router.push("/dashboard/job-roles")
    );
  };

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/job-roles">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Create New Job Role</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <JobRoleForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create Job Role"
        />
      </div>
    </div>
  );
}
