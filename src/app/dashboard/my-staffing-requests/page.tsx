"use client";

import { useEffect, useState } from "react";
import { uiTheme } from "@/app/lib/uiConfig";
import StaffingRequestTable from "../common/staffing-requests/StaffingRequestTable";
import { useAuth } from "@/app/components/AuthProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MyStaffingRequestsPage() {
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user]);

  if (!userId) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>My Staffing Requests</h1>
        <Link href="/dashboard/my-staffing-requests/apply">
          <Button className={uiTheme.colors.primary}>
            Create New Staffing Request
          </Button>
        </Link>
      </div>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <StaffingRequestTable
          filters={{ userId: String(userId) }}
          basePath="my-staffing-requests"
        />
      </div>
    </div>
  );
}
