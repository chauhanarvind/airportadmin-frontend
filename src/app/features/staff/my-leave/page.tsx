"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import LeaveTable from "@/app/features/common/leave/LeaveTable";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { useAuth } from "@/app/components/AuthProvider";

export default function MyLeavePage() {
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user]);

  if (!userId) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="My Leave Requests"
        actions={
          <Link href="/dashboard/my-leave/apply">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Apply New Leave
            </Button>
          </Link>
        }
      />

      <div className="bg-white shadow-md rounded-2xl p-4 mt-4">
        <LeaveTable filters={{ userId: String(userId) }} basePath="my-leave" />
      </div>
    </PageContainer>
  );
}
