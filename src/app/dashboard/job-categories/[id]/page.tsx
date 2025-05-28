"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { Button } from "@/components/ui/button";
import JobCategoryForm from "../JobCategoryForm";
import {
  JobCategoryResponse,
  CreateJobCategory,
  UpdateJobCategory,
} from "../JobCategoryTypes";

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
          `/api/job-categories/${id}`,
          "Job Category"
        );

        if (category) {
          setInitialData({
            id: category.id,
            categoryName: category.categoryName,
          });
        } else {
          router.push("/dashboard/job-categories");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, router]);

  const handleSubmit = async (data: JobCategoryFormData) => {
    await handleUpdate<JobCategoryResponse, JobCategoryFormData>(
      `/api/job-categories/${data.id}`,
      "PUT",
      data,
      "Job Category",
      () => router.push("/dashboard/job-categories")
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading category details...</p>
      </div>
    );
  }

  if (!initialData) return null;

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
        <h1 className={uiTheme.text.heading}>Edit Job Category</h1>
      </div>

      {/* Form Card */}
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
    </div>
  );
}
