"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { useAuth } from "@/app/components/AuthProvider";
import { handleFetchList } from "@/app/lib/crudService";
import MyShiftCoverTable from "./MyShiftCoverTable";
import { ShiftCoverResponseDto } from "../../common/shift-cover/ShiftCoverTypes";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

export default function MyShiftCoverPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
  const { user } = useAuth();
  const [requests, setRequests] = useState<ShiftCoverResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchRequests = async () => {
      const res = await handleFetchList<ShiftCoverResponseDto[]>(
        `/api/shift-cover/user/${user.id}`,
        "Shift Cover Requests"
      );
      if (res) setRequests(res);
      setLoading(false);
    };

    fetchRequests();
  }, [user?.id]);

  if (loading) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader title="My Shift Cover Requests" />
      {requests.length === 0 ? (
        <p className="text-muted-foreground mt-4">
          You haven’t submitted any shift cover requests.
        </p>
      ) : (
        <MyShiftCoverTable requests={requests} />
      )}
    </PageContainer>
  );
}
