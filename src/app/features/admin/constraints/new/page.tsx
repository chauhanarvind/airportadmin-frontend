"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import ConstraintProfileForm from "../ConstraintProfileForm";
import { handleCreate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import {
  CreateConstraintProfile,
  ConstraintProfileResponse,
} from "../ConstraintProfileTypes";

export default function CreateConstraintProfilePage() {
  useRequireRoles(["Admin"]);
  const router = useRouter();

  const handleSubmit = async (data: CreateConstraintProfile) => {
    await handleCreate<CreateConstraintProfile, ConstraintProfileResponse>(
      "/api/constraint-profiles/create",
      data,
      "Constraint Profile",
      () => router.push("/dashboard/constraints")
    );
  };

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/constraints">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Create Constraint Profile</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <ConstraintProfileForm
          onSubmit={handleSubmit}
          isEditMode={false}
          submitText="Create Profile"
        />
      </div>
    </div>
  );
}
