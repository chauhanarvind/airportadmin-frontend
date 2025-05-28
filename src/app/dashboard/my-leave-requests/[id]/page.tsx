"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { useAuth } from "@/app/components/AuthProvider";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import {
  LeaveRequestCreate,
  LeaveRequestResponse,
} from "@/app/dashboard/common/leave/LeaveTypes";
import MyLeaveForm from "../MyLeaveForm";

export default function ViewMyLeavePage() {
  useRequireRoles(["Crew", "Admin", "Supervisor", "Manager"]);

  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [leaveData, setLeaveData] = useState<LeaveRequestResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchLeave = async () => {
      setLoading(true);
      const res = await handleGetById<LeaveRequestResponse>(
        `/api/leaves/${id}`,
        "Leave Request"
      );
      if (!res || res.userId !== user?.id) {
        router.push("/dashboard/my-leave-requests");
      } else {
        setLeaveData(res);
      }
      setLoading(false);
    };

    fetchLeave();
  }, [id, router, user]);

  const handleResubmit = async (data: LeaveRequestCreate) => {
    await handleUpdate<LeaveRequestResponse, LeaveRequestCreate>(
      `/api/leaves/${id}/resubmit?userId=${user?.id}`,
      "PUT",
      data,
      "Leave Request",
      () => router.push("/dashboard/my-leave-requests")
    );
  };

  const handleCancel = async () => {
    await handleUpdate<LeaveRequestResponse, unknown>(
      `/api/leaves/${id}/cancel?userId=${user?.id}`,
      "PUT",
      undefined,
      "Leave Request",
      () => router.push("/dashboard/my-leave-requests")
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading leave request...</p>
      </div>
    );
  }

  if (!leaveData) return null;

  const isResubmittable = ["REJECTED", "CANCELLED"].includes(leaveData.status);
  const isCancelable = leaveData.status === "PENDING";

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/my-leave-requests">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Leave Request Details</h1>
      </div>

      {/* Form Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-6`}
      >
        <MyLeaveForm
          mode={
            isResubmittable ? "resubmit" : isCancelable ? "cancel" : "apply"
          }
          initialData={leaveData}
          onSubmit={handleResubmit}
          onCancel={handleCancel}
          disabled={!isResubmittable && !isCancelable}
          currentStatus={leaveData.status}
        />
      </div>
    </div>
  );
}
