"use client";

import { useEffect, useState } from "react";
import { uiTheme } from "@/app/lib/uiConfig";
import LeaveTable from "@/app/dashboard/common/leave/LeaveTable";
import { useAuth } from "@/app/components/AuthProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MyLeavePage() {
  const { user } = useAuth(); // get logged-in user
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user]);

  if (!userId) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className={uiTheme.layout.container}>
      <div className="flex justify-between items-center">
        <h1 className={uiTheme.text.heading}>My Leave Requests</h1>
        <Link href="/dashboard/my-leave/">
          <Button className={uiTheme.colors.primary}>Apply new leave</Button>
        </Link>
      </div>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4`}
      >
        <LeaveTable filters={{ userId: String(userId) }} basePath="my-leave" />
      </div>
    </div>
  );
}
