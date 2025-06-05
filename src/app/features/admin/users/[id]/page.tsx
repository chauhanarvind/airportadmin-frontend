"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";

import UserForm from "../UserForm";
import {
  CreateUser,
  UpdateUser,
  UserResponse,
} from "@/app/features/users/UserTypes";
import PageLoader from "@/app/components/ui/PageLoader";

type UserFormData = Partial<UpdateUser> & CreateUser;

export default function EditUserPage() {
  useRequireRoles(["Admin"]);

  const { id } = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState<Partial<UserFormData> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await handleGetById<UserResponse>(
          `/api/users/${id}`,
          "User"
        );

        if (user) {
          setInitialData({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roleId: user.roleId ?? undefined,
            jobLevelId: user.jobLevelId ?? undefined,
            jobRoleId: user.jobRoleId ?? undefined,
            constraintProfileId: user.constraintProfileId ?? undefined,
          });
        } else {
          router.push("/dashboard/users");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, router]);

  const handleSubmit = async (data: UserFormData) => {
    await handleUpdate<UserResponse, UserFormData>(
      `/api/users/${data.id}`,
      "PUT",
      data,
      "User",
      () => router.push("/dashboard/users")
    );
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!initialData) return null;

  return (
    <PageContainer>
      <PageHeader
        title="Edit User"
        actions={
          <Link href="/dashboard/users">
            <Button
              size="sm"
              className="bg-white text-gray-800 hover:bg-gray-100 shadow-sm rounded-md"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="bg-white shadow-md rounded-2xl p-4 space-y-6">
        <UserForm
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update User"
        />
      </div>
    </PageContainer>
  );
}
