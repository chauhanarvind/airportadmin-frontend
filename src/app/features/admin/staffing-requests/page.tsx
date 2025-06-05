"use client";

import PageHeader from "@/app/components/ui/PageHeader";
import PageContainer from "@/app/components/layout/PageContainer";
import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import StaffingRequestTable from "../../common/staffing-requests/StaffingRequestTable";

export default function StaffingRequestsPage() {
  // Restrict access to Admin, Supervisor, or Manager
  useRequireRoles(["Admin", "Supervisor", "Manager"]);

  return (
    <PageContainer>
      <PageHeader title="All Staffing Requests" />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <StaffingRequestTable basePath="staffing-requests" />
      </div>
    </PageContainer>
  );
}
