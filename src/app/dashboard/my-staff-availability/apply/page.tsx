"use client";

import { useRouter } from "next/navigation";

import { uiTheme } from "@/app/lib/uiConfig";
import MyStaffAvailabilityForm from "../MyStaffAvailabilityForm";
import { handleCreate } from "@/app/lib/crudService";
import { useAuth } from "@/app/components/AuthProvider";
import { StaffAvailabilityRequest } from "../../common/staff-availability/StaffAvailabilityTypes";

export default function ApplyStaffAvailabilityPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: StaffAvailabilityRequest) => {
    if (!user?.id) return;

    const payload = { ...data, userId: user.id };

    await handleCreate(
      "/api/staff-availability",
      payload,
      "Staff availability",
      () => router.push("/dashboard/my-staff-availability")
    );
  };

  return (
    <div className={uiTheme.layout.container}>
      <h1 className={uiTheme.text.heading}>Submit Availability</h1>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <MyStaffAvailabilityForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
