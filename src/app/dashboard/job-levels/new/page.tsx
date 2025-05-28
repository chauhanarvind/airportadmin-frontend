"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import JobLevelForm from "../JobLevelForm";
import { handleCreate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { CreateJobLevel, JobLevelResponse } from "../JobLevelTypes";

export default function CreateJobLevelPage() {
  useRequireRoles(["Admin"]);
  const router = useRouter();

  const handleSubmit = async (data: CreateJobLevel) => {
    await handleCreate<CreateJobLevel, JobLevelResponse>(
      "/api/job-levels/create",
      data,
      "Job Level",
      () => router.push("/dashboard/job-levels")
    );
  };

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/job-levels">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Create New Job Level</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <JobLevelForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create Level"
        />
      </div>
    </div>
  );
}
