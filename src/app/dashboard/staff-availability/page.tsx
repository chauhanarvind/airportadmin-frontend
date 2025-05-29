"use client";

import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import StaffAvailabilityTable from "../common/staff-availability/StaffAvailabilityTable";

export default function StaffAvailabilityPage() {
  useRequireRoles(["Admin", "Supervisor", "Manager"]);

  return (
    <div className={uiTheme.layout.container}>
      <h1 className={uiTheme.text.heading}>Staff Availability</h1>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <StaffAvailabilityTable clickableRows={false} />
      </div>
    </div>
  );
}
