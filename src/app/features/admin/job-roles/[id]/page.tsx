"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { Button } from "@/components/ui/button";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";

import JobRoleForm from "../JobRoleForm";
import { JobRoleResponse, CreateJobRole, UpdateJobRole } from "../JobRoleTypes";
import { uiTheme } from "@/app/lib/uiConfig";

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
          router.push("/features/admin/job-roles");
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
      () => router.push("/features/admin/job-roles")
    );
  };

  if (loading) return <PageLoader />;
  if (!initialData) return null;

  return (
    <PageContainer>
      <PageHeader
        title="Edit Job Role"
        actions={
          <Link href="/features/admin/job-roles">
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
        <JobRoleForm
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update Job Role"
        />
      </div>
    </PageContainer>
  );
}
