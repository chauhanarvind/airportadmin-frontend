"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import StaffingRequestTable from "../common/staffing-requests/StaffingRequestTable";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { uiTheme } from "@/app/lib/uiConfig";

export default function MyStaffingRequestsPage() {
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.id) setUserId(user.id);
  }, [user]);

  if (!userId) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="My Staffing Requests"
        actions={
          <Link href="/dashboard/my-staffing-requests/apply">
            <Button className={uiTheme.colors.primary}>
              Create New Staffing Request
            </Button>
          </Link>
        }
      />

      <div className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding}`}>
        <StaffingRequestTable
          filters={{ userId: String(userId) }}
          basePath="my-staffing-requests"
        />
      </div>
    </PageContainer>
  );
}
