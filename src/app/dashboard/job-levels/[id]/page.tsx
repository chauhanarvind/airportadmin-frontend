"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { Button } from "@/components/ui/button";
import JobLevelForm from "../JobLevelForm";
import {
  JobLevelResponse,
  CreateJobLevel,
  UpdateJobLevel,
} from "../JobLevelTypes";

type JobLevelFormData = Partial<UpdateJobLevel> & CreateJobLevel;

export default function EditJobLevelPage() {
  useRequireRoles(["Admin"]);

  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] =
    useState<Partial<JobLevelFormData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchLevel = async () => {
      setLoading(true);
      try {
        const level = await handleGetById<JobLevelResponse>(
          `/api/job-levels/${id}`,
          "Job Level"
        );

        if (level) {
          setInitialData({
            id: level.id,
            levelName: level.levelName,
          });
        } else {
          router.push("/dashboard/job-levels");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [id, router]);

  const handleSubmit = async (data: JobLevelFormData) => {
    await handleUpdate<JobLevelResponse, JobLevelFormData>(
      `/api/job-levels/${data.id}`,
      "PUT",
      data,
      "Job Level",
      () => router.push("/dashboard/job-levels")
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading job level details...</p>
      </div>
    );
  }

  if (!initialData) return null;

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
        <h1 className={uiTheme.text.heading}>Edit Job Level</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <JobLevelForm
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update Level"
        />
      </div>
    </div>
  );
}
