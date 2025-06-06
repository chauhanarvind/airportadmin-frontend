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
import { handleFetchPaged } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export default function StaffingRequestsPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);

  const [data, setData] = useState<StaffingRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (user?.id) setUserId(user.id);
  }, [user]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) return;

      setLoading(true);
      const query = new URLSearchParams({
        userId: userId.toString(),
        page: page.toString(),
        size: "10",
      });

      const result = await handleFetchPaged<
        PaginatedResponse<StaffingRequestResponse>
      >(`/api/staffing-requests/?${query.toString()}`, "My Staffing Requests");

      if (result) {
        setData(result.content);
        setTotalPages(result.totalPages);
      }

      setLoading(false);
    };

    fetchRequests();
  }, [userId, page]);

  if (!userId) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="My Staffing Requests"
        actions={
          <Link href="/features/staff/my-staffing-requests/apply">
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
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          basePath="my-staffing-requests"
        />
      </div>
    </PageContainer>
  );
}
