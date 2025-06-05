"use client";

import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import StaffAvailabilityTable from "../../common/staff-availability/StaffAvailabilityTable";

export default function StaffAvailabilityPage() {
  useRequireRoles(["Admin", "Supervisor", "Manager"]);

  return (
    <PageContainer>
      <PageHeader title="Staff Availability" />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <StaffAvailabilityTable clickableRows={false} />
      </div>
    </PageContainer>
  );
}
