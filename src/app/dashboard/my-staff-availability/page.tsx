"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { uiTheme } from "@/app/lib/uiConfig";
import { useAuth } from "@/app/components/AuthProvider";
import { Button } from "@/components/ui/button";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";

import StaffAvailabilityTable from "../common/staff-availability/StaffAvailabilityTable";

export default function MyStaffAvailabilityPage() {
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.id) setUserId(user.id);
  }, [user]);

  if (!userId) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="My Availability"
        actions={
          <Link href="/dashboard/my-staff-availability/apply">
            <Button className={uiTheme.colors.primary}>Add Availability</Button>
          </Link>
        }
      />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <StaffAvailabilityTable
          filters={{ userId: String(userId) }}
          basePath="my-staff-availability"
          clickableRows={true}
        />
      </div>
    </PageContainer>
  );
}
