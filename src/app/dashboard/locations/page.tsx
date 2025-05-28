"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocationTable from "./LocationTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

export default function LocationsPage() {
  useRequireRoles(["Admin", "Manager"]);

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>Location Management</h1>
        <Link href="/dashboard/locations/new">
          <Button className={uiTheme.colors.primary}>Add New Location</Button>
        </Link>
      </div>

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <LocationTable />
      </div>
    </div>
  );
}
