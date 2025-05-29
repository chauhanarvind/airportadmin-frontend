"use client";

import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import StaffingRequestTable from "../common/staffing-requests/StaffingRequestTable";

export default function StaffingRequestsPage() {
  useRequireRoles(["Admin", "Supervisor", "Manager"]);

  return (
    <div className={uiTheme.layout.container}>
      <h1 className={uiTheme.text.heading}>All Staffing Requests</h1>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <StaffingRequestTable basePath="staffing-requests" />
      </div>
    </div>
  );
}
