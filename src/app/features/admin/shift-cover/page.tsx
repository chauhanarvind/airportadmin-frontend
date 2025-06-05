"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { handleFetchList } from "@/app/lib/crudService";
import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import ShiftCoverTable from "./ShiftCoverTable";

export default function ShiftCoverAdminPage() {
  const [requests, setRequests] = useState<ShiftCoverResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await handleFetchList<ShiftCoverResponseDto[]>(
        "/api/shift-cover",
        "Shift Cover Requests"
      );
      if (res) setRequests(res);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader title="All Shift Cover Requests" />
      {requests.length === 0 ? (
        <p className="text-muted-foreground mt-4">
          No shift cover requests have been submitted.
        </p>
      ) : (
        <ShiftCoverTable requests={requests} />
      )}
    </PageContainer>
  );
}
