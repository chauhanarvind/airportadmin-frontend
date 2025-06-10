"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { uiTheme } from "@/app/lib/uiConfig";
import { handleCreate } from "@/app/lib/crudService";
import { StaffingRequestCreate } from "../../../common/staffing-requests/StaffingRequestTypes";
import { useAuth } from "@/app/components/AuthProvider";
import MyStaffingRequestForm from "../StaffingRequestForm";

import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { cleanStaffingRequestPayload } from "../cleanStaffingRequestPayload";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { toast } from "sonner";

export default function ApplyMyStaffingRequestPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor"]);
  const { user } = useAuth();
  const router = useRouter();

  const isDataValid = (data: StaffingRequestCreate) => {
    if (!user?.id) return false;

    // Step 1: Filter selected days (i.e., days where user added at least one role)
    const selectedDays = data.days.filter(
      (day) => Array.isArray(day.items) && day.items.length > 0
    );

    if (selectedDays.length === 0) {
      toast.error("Please select at least one day and add staffing roles.");
      return false;
    }

    // Step 2: Validate every item in selected days
    const isInvalid = selectedDays.some((day) =>
      day.items.some(
        (item) =>
          !item.jobRoleId ||
          !item.jobLevelId ||
          !item.requiredCount ||
          !item.startTime ||
          !item.endTime
      )
    );

    if (isInvalid) {
      toast.error("All fields are required for each staffing role.");
      return false;
    }
    return true;
  };
  const handleSubmit = async (data: StaffingRequestCreate) => {
    if (!isDataValid(data)) return;

    const payload: StaffingRequestCreate = {
      ...data,
    };

    const cleanedPayload = cleanStaffingRequestPayload(payload);

    await handleCreate(
      "/staffing-requests/submit",
      cleanedPayload,
      "Staffing request",
      () => router.push("/features/my/my-staffing-requests")
    );
  };

  return (
    <PageContainer>
      <PageHeader
        title="Apply for Staffing Request"
        actions={
          <Link href="/features/my/my-staffing-requests">
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
