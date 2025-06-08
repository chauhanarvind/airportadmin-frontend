"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/app/components/AuthProvider";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";
import { uiTheme } from "@/app/lib/uiConfig";

import StaffingRequestTable from "../../common/staffing-requests/StaffingRequestTable";
import { StaffingRequestResponse } from "../../common/staffing-requests/StaffingRequestTypes";
import { handleFetchList } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

export default function MyStaffingRequestsPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);

  const [data, setData] = useState<StaffingRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) setUserId(user.id);
  }, [user]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) return;

      setLoading(true);

      const result = await handleFetchList<StaffingRequestResponse[]>(
        `/api/staffing-requests/user/${userId}`,
        "My Staffing Requests"
      );

      if (result) {
        setData(result);
      }

      setLoading(false);
    };

    fetchRequests();
  }, [userId]);

  if (!userId) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="My Staffing Requests"
        actions={
          <Link href="/features/my/my-staffing-requests/apply">
            <Button className={uiTheme.colors.primary}>
              Create New Staffing Request
            </Button>
          </Link>
        }
      />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <StaffingRequestTable
          data={data}
          loading={loading}
          basePath="my/my-staffing-requests"
        />
      </div>
    </PageContainer>
  );
}
