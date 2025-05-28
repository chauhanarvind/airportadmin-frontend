"use client";

import { useRouter } from "next/navigation";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { useAuth } from "@/app/components/AuthProvider";
import { uiTheme } from "@/app/lib/uiConfig";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  LeaveRequestCreate,
  LeaveRequestResponse,
} from "@/app/dashboard/common/leave/LeaveTypes";
import MyLeaveForm from "../MyLeaveForm";
import { handleCreate } from "@/app/lib/crudService";

export default function ApplyLeavePage() {
  useRequireRoles(["Crew", "Admin", "Supervisor", "Manager"]);

  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: LeaveRequestCreate) => {
    await handleCreate<LeaveRequestCreate, LeaveRequestResponse>(
      "/api/leaves/apply",
      { ...data, userId: user?.id ?? 0 },
      "Leave Request",
      () => router.push("/dashboard/my-leave-requests")
    );
  };

  return (
    <div className={uiTheme.layout.container}>
      {/* Back button and heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/my-leave-requests">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Apply for Leave</h1>
      </div>

      {/* Form in card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-6`}
      >
        <MyLeaveForm mode="apply" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
