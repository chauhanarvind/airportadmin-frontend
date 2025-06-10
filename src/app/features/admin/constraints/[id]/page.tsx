"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import { Button } from "@/components/ui/button";
import ConstraintProfileForm from "../ConstraintProfileForm";
import {
  ConstraintProfileResponse,
  CreateConstraintProfile,
  UpdateConstraintProfile,
} from "../ConstraintProfileTypes";

type ConstraintProfileFormData = Partial<UpdateConstraintProfile> &
  CreateConstraintProfile;

export default function EditConstraintProfilePage() {
  useRequireRoles(["Admin"]);

  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] =
    useState<Partial<ConstraintProfileFormData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profile = await handleGetById<ConstraintProfileResponse>(
          `/constraint-profiles/${id}`,
          "Constraint Profile"
        );

        if (profile) {
          setInitialData({
            id: profile.id,
            name: profile.name,
            maxHoursPerDay: profile.maxHoursPerDay ?? undefined,
            maxHoursPerWeek: profile.maxHoursPerWeek ?? undefined,
            preferredStartTime: profile.preferredStartTime || "",
            preferredEndTime: profile.preferredEndTime || "",
            allowedDays: profile.allowedDays || [],
          });
        } else {
          router.push("/features/admin/constraints");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, router]);

  const handleSubmit = async (data: ConstraintProfileFormData) => {
    await handleUpdate<ConstraintProfileResponse, ConstraintProfileFormData>(
      `/constraint-profiles/${id}`,
      "PUT",
      data,
      "Constraint Profile",
      () => router.push("/features/admin/constraints")
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!initialData) return null;

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/features/admin/constraints">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Edit Constraint Profile</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <ConstraintProfileForm
          initialData={initialData}
          isEditMode
          onSubmit={handleSubmit}
          submitText="Update Profile"
        />
      </div>
    </div>
  );
}
