"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { Button } from "@/components/ui/button";
import JobRoleForm from "../JobRoleForm";
import { JobRoleResponse, CreateJobRole, UpdateJobRole } from "../JobRoleTypes";

type JobRoleFormData = Partial<UpdateJobRole> & CreateJobRole;

export default function EditJobRolePage() {
  useRequireRoles(["Admin"]);

  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] =
    useState<Partial<JobRoleFormData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchJobRole = async () => {
      setLoading(true);
      try {
        const role = await handleGetById<JobRoleResponse>(
          `/api/job-roles/${id}`,
          "Job Role"
        );

        if (role) {
          setInitialData({
            id: role.id,
            roleName: role.roleName,
            categoryId: role.categoryId,
          });
        } else {
          router.push("/dashboard/job-roles");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobRole();
  }, [id, router]);

  const handleSubmit = async (data: JobRoleFormData) => {
    await handleUpdate<JobRoleResponse, JobRoleFormData>(
      `/api/job-roles/${data.id}`,
      "PUT",
      data,
      "Job Role",
      () => router.push("/dashboard/job-roles")
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading job role details...</p>
      </div>
    );
  }

  if (!initialData) return null;

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
        <h1 className={uiTheme.text.heading}>Edit Job Role</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <JobRoleForm
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update Job Role"
        />
      </div>
    </div>
  );
}
