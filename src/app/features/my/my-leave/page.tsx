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
import { handleFetchList } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

export default function MyLeavePage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);

  const [leaves, setLeaves] = useState<LeaveRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) setUserId(user.id);
  }, [user]);

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!userId) return;

      setLoading(true);

      const res = await handleFetchList<LeaveRequestResponse[]>(
        `/api/leaves/user/${userId}`,
        "My Leave Requests"
      );
      console.log(res);
      if (res) {
        setLeaves(res);
      }

      setLoading(false);
    };

    fetchLeaves();
  }, [userId]);

  if (!userId) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="My Leave Requests"
        actions={
          <Link href="/features/my/my-leave/apply">
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
          basePath="my-leave"
          clickable={false}
        />
      </div>
    </PageContainer>
  );
}
