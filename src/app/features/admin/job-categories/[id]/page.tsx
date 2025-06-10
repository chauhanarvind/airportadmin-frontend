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

import JobCategoryForm from "../JobCategoryForm";
import {
  JobCategoryResponse,
  CreateJobCategory,
  UpdateJobCategory,
} from "../JobCategoryTypes";
import { uiTheme } from "@/app/lib/uiConfig";

type JobCategoryFormData = Partial<UpdateJobCategory> & CreateJobCategory;

export default function EditJobCategoryPage() {
  useRequireRoles(["Admin"]);

  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] =
    useState<Partial<JobCategoryFormData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      setLoading(true);
      try {
        const category = await handleGetById<JobCategoryResponse>(
          `/job-categories/${id}`,
          "Job Category"
        );

        if (category) {
          setInitialData({
            id: category.id,
            categoryName: category.categoryName,
          });
        } else {
          router.push("/features/admin/job-categories");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, router]);

  const handleSubmit = async (data: JobCategoryFormData) => {
    await handleUpdate<JobCategoryResponse, JobCategoryFormData>(
      `/job-categories/${data.id}`,
      "PUT",
      data,
      "Job Category",
      () => router.push("/features/admin/job-categories")
    );
  };

  if (loading) return <PageLoader />;
  if (!initialData) return null;

  return (
    <PageContainer>
      <PageHeader
        title="Edit Job Category"
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
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update Category"
        />
      </div>
    </PageContainer>
  );
}
