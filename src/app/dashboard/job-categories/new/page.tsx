"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { handleCreate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { CreateJobCategory, JobCategoryResponse } from "../JobCategoryTypes";
import JobCategoryForm from "../JobCategoryForm";

export default function CreateJobCategoryPage() {
  useRequireRoles(["Admin"]);
  const router = useRouter();

  const handleSubmit = async (data: CreateJobCategory) => {
    await handleCreate<CreateJobCategory, JobCategoryResponse>(
      "/api/job-categories/create",
      data,
      "Job Category",
      () => router.push("/dashboard/job-categories")
    );
  };

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/job-categories">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Create New Job Category</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <JobCategoryForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create Category"
        />
      </div>
    </div>
  );
}
