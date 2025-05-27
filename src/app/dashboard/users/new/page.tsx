"use client";

import { useRouter } from "next/navigation";
import { handleCreate } from "@/app/lib/crudService";
import UserForm from "../UserForm";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CreateUser, UpdateUser, UserResponse } from "../UserTypes";

type UserFormData = Partial<UpdateUser> & CreateUser;

export default function CreateUserPage() {
  useRequireRoles(["Admin"]);

  const router = useRouter();

  const handleSubmit = async (data: UserFormData) => {
    console.log(data);
    await handleCreate<UserFormData, UserResponse>(
      "/api/users/create",
      data,
      "User",
      () => router.push("/dashboard/users")
    );
  };

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
        <h1 className={uiTheme.text.heading}>Create New User</h1>
      </div>

      {/* Form in card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <UserForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create User"
        />
      </div>
    </div>
  );
}
