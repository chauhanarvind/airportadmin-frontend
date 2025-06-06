"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import LeaveTable from "@/app/features/common/leave/LeaveTable";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { useAuth } from "@/app/components/AuthProvider";
import { LeaveRequestResponse } from "@/app/features/common/leave/LeaveTypes";
import { handleFetchPaged } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export default function MyLeavePage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);

  const [leaves, setLeaves] = useState<LeaveRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (user?.id) setUserId(user.id);
  }, [user]);

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!userId) return;

      setLoading(true);
      const query = new URLSearchParams({
        userId: userId.toString(),
        page: page.toString(),
        size: "10",
      });

      const res = await handleFetchPaged<
        PaginatedResponse<LeaveRequestResponse>
      >(`/api/leaves?${query.toString()}`, "My Leave Requests");

      if (res) {
        setLeaves(res.content);
        setTotalPages(res.totalPages);
      }

      setLoading(false);
    };

    fetchLeaves();
  }, [userId, page]);

  if (!userId) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="My Leave Requests"
        actions={
          <Link href="/features/staff/my-leave/apply">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Apply New Leave
            </Button>
          </Link>
        }
      />

      <div className="bg-white shadow-md rounded-2xl p-4 mt-4">
        <LeaveTable
          data={leaves}
          loading={loading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          basePath="my-leave"
        />
      </div>
    </PageContainer>
  );
}
