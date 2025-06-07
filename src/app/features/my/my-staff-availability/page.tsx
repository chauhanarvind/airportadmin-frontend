"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { uiTheme } from "@/app/lib/uiConfig";
import { useAuth } from "@/app/components/AuthProvider";
import { Button } from "@/components/ui/button";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { handleFetchList } from "@/app/lib/crudService";

import StaffAvailabilityTable from "../../common/staff-availability/StaffAvailabilityTable";
import { StaffAvailabilityResponse } from "../../common/staff-availability/StaffAvailabilityTypes";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

export default function MyStaffAvailabilityPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);

  const [data, setData] = useState<StaffAvailabilityResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) setUserId(user.id);
  }, [user]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!userId) return;

      setLoading(true);

      const res = await handleFetchList<StaffAvailabilityResponse[]>(
        `/api/staff-availability/user/${userId}`,
        "My Availability"
      );

      if (res) {
        setData(res);
      }

      setLoading(false);
    };

    fetchAvailability();
  }, [userId]);

  if (!userId) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="My Availability"
        actions={
          <Link href="/features/staff/my-staff-availability/apply">
            <Button className={uiTheme.colors.primary}>Add Availability</Button>
          </Link>
        }
      />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <StaffAvailabilityTable
          data={data}
          loading={loading}
          basePath="my-staff-availability"
          clickableRows={true}
        />
      </div>
    </PageContainer>
  );
}
