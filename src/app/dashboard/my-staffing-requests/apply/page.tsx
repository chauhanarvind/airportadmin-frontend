"use client";

import { useRouter } from "next/navigation";

import { uiTheme } from "@/app/lib/uiConfig";
import { handleCreate } from "@/app/lib/crudService";
import { StaffingRequestCreate } from "../../common/staffing-requests/StaffingRequestTypes";
import { useAuth } from "@/app/components/AuthProvider";
import MyStaffingRequestForm from "../MyStaffingRequestForm";

export default function ApplyStaffingRequestPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: StaffingRequestCreate) => {
    if (!user?.id) return;

    const payload: StaffingRequestCreate = {
      ...data,
      managerId: user.id,
    };

    await handleCreate(
      "/api/staffing-requests",
      payload,
      "Staffing request",
      () => router.push("/dashboard/my-staffing-requests")
    );
  };

  return (
    <div className={uiTheme.layout.container}>
      <h1 className={uiTheme.text.heading}>Apply for Staffing Request</h1>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <MyStaffingRequestForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
