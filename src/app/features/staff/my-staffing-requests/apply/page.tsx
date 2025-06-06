"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { uiTheme } from "@/app/lib/uiConfig";
import { handleCreate } from "@/app/lib/crudService";
import { StaffingRequestCreate } from "../../../common/staffing-requests/StaffingRequestTypes";
import { useAuth } from "@/app/components/AuthProvider";
import MyStaffingRequestForm from "../MyStaffingRequestForm";

import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { cleanStaffingRequestPayload } from "../cleanStaffingRequestPayload";

export default function ApplyStaffingRequestPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: StaffingRequestCreate) => {
    if (!user?.id) return;

    const payload: StaffingRequestCreate = {
      ...data,
      managerId: user.id,
    };

    const cleanedPayload = cleanStaffingRequestPayload(payload);

    console.log(cleanedPayload);
    await handleCreate(
      "/api/staffing-requests/submit",
      cleanedPayload,
      "Staffing request",
      () => router.push("/dashboard/my-staffing-requests")
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Apply for Staffing Request"
        actions={
          <Link href="/dashboard/my-staffing-requests">
            <Button size="sm" className={uiTheme.buttons.card}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6`}
      >
        <MyStaffingRequestForm onSubmit={handleSubmit} />
      </div>
    </PageContainer>
  );
}
