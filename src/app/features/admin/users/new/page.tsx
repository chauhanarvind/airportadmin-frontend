"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleCreate } from "@/app/lib/crudService";

import UserForm from "../UserForm";
import { CreateUser, UpdateUser, UserResponse } from "../UserTypes";

type UserFormData = Partial<UpdateUser> & CreateUser;

export default function CreateUserPage() {
  useRequireRoles(["Admin"]);

  const router = useRouter();

  const handleSubmit = async (data: UserFormData) => {
    await handleCreate<UserFormData, UserResponse>(
      "/api/users/create",
      data,
      "User",
      () => router.push("/features/admin/users")
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create New User"
        actions={
          <Link href="/features/admin/users">
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
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create User"
        />
      </div>
    </PageContainer>
  );
}
