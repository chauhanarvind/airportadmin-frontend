"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import UserForm from "../UserForm";
import {
  CreateUser,
  UpdateUser,
  UserResponse,
} from "@/app/dashboard/users/UserTypes";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { uiTheme } from "@/app/lib/uiConfig";

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
    console.log(data);
    await handleUpdate<UserResponse, UserFormData>(
      `/api/users/${data.id}`,
      "PUT",
      data,
      "User",
      () => router.push("/dashboard/users")
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading user details...</p>
      </div>
    );
  }

  if (!initialData) return null;

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/users">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Edit User</h1>
      </div>

      {/* Form in card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <UserForm
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update User"
        />
      </div>
    </div>
  );
}
