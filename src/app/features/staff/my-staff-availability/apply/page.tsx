"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { uiTheme } from "@/app/lib/uiConfig";
import { useAuth } from "@/app/components/AuthProvider";
import { handleCreate } from "@/app/lib/crudService";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import { Button } from "@/components/ui/button";

import MyStaffAvailabilityForm from "../MyStaffAvailabilityForm";
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
    <PageContainer>
      <PageHeader
        title="Submit Availability"
        actions={
          <Link href="/dashboard/my-staff-availability">
            <Button size="sm" className={uiTheme.buttons.back}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <MyStaffAvailabilityForm onSubmit={handleSubmit} />
      </div>
    </PageContainer>
  );
}
