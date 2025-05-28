"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { useAuth } from "@/app/components/AuthProvider";
import { handleFetchAll } from "@/app/lib/crudService";
import { LeaveRequestResponse } from "@/app/dashboard/common/leave/LeaveTypes";
import MyLeaveTable from "./MyLeaveTable";

export default function MyLeaveRequestsPage() {
  useRequireRoles(["Crew", "Admin", "Supervisor", "Manager"]);

  const { user } = useAuth();
  const [leaveData, setLeaveData] = useState<LeaveRequestResponse[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const res = await handleFetchAll<LeaveRequestResponse[]>(
        `/api/leaves/user/${user.id}`,
        "Leave Requests"
      );
      if (res) setLeaveData(res);
    };

    fetchData();
  }, [user]);

  return (
    <div className={uiTheme.layout.container}>
      {/* Heading and Apply Button */}
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>My Leave Requests</h1>
        <Link href="/dashboard/my-leave-requests/apply">
          <Button className={uiTheme.colors.primary}>Apply for Leave</Button>
        </Link>
      </div>

      {/* Table in Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-6`}
      >
        <MyLeaveTable data={leaveData} />
      </div>
    </div>
  );
}
