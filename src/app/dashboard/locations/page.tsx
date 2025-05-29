"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";

import LocationTable from "./LocationTable";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

export default function LocationsPage() {
  useRequireRoles(["Admin", "Manager"]);

  return (
    <PageContainer>
      <PageHeader
        title="Location Management"
        actions={
          <Link href="/dashboard/locations/new">
            <Button className={uiTheme.colors.primary}>Add New Location</Button>
          </Link>
        }
      />

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <LocationTable />
      </div>
    </PageContainer>
  );
}
