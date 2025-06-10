"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";

import { handleCreate } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

import { CreateJobCategory, JobCategoryResponse } from "../JobCategoryTypes";
import JobCategoryForm from "../JobCategoryForm";
import { uiTheme } from "@/app/lib/uiConfig";

export default function CreateJobCategoryPage() {
  useRequireRoles(["Admin"]);
  const router = useRouter();

  const handleSubmit = async (data: CreateJobCategory) => {
    await handleCreate<CreateJobCategory, JobCategoryResponse>(
      "/job-categories/create",
      data,
      "Job Category",
      () => router.push("/features/admin/job-categories")
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create New Job Category"
        actions={
          <Link href="/features/admin/job-categories">
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
        <JobCategoryForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create Category"
        />
      </div>
    </PageContainer>
  );
}
