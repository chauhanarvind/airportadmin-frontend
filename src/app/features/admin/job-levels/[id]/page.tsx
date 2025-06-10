"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { Button } from "@/components/ui/button";

import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";
import PageLoader from "@/app/components/ui/PageLoader";

import JobLevelForm from "../JobLevelForm";
import {
  JobLevelResponse,
  CreateJobLevel,
  UpdateJobLevel,
} from "../JobLevelTypes";
import { uiTheme } from "@/app/lib/uiConfig";

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
          `/job-levels/${id}`,
          "Job Level"
        );

        if (level) {
          setInitialData({
            id: level.id,
            levelName: level.levelName,
          });
        } else {
          router.push("/features/admin/job-levels");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLevel();
  }, [id, router]);

  const handleSubmit = async (data: JobLevelFormData) => {
    await handleUpdate<JobLevelResponse, JobLevelFormData>(
      `/job-levels/${data.id}`,
      "PUT",
      data,
      "Job Level",
      () => router.push("/features/admin/job-levels")
    );
  };

  if (loading) return <PageLoader />;
  if (!initialData) return null;

  return (
    <PageContainer>
      <PageHeader
        title="Edit Job Level"
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
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update Level"
        />
      </div>
    </PageContainer>
  );
}
