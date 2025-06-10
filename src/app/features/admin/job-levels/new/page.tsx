"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";

import JobLevelForm from "../JobLevelForm";
import { handleCreate } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { CreateJobLevel, JobLevelResponse } from "../JobLevelTypes";
import { uiTheme } from "@/app/lib/uiConfig";

export default function CreateJobLevelPage() {
  useRequireRoles(["Admin"]);
  const router = useRouter();

  const handleSubmit = async (data: CreateJobLevel) => {
    await handleCreate<CreateJobLevel, JobLevelResponse>(
      "/job-levels/create",
      data,
      "Job Level",
      () => router.push("/features/admin/job-levels")
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create New Job Level"
        actions={
          <Link href="/features/admin/job-levels">
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
        <JobLevelForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create Level"
        />
      </div>
    </PageContainer>
  );
}
