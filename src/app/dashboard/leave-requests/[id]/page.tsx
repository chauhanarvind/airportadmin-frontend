"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { uiTheme } from "@/app/lib/uiConfig";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import LeaveForm from "../LeaveForm";
import {
  LeaveRequestResponse,
  LeaveStatus,
} from "@/app/dashboard/common/leave/LeaveTypes";

export default function EditLeavePage() {
  useRequireRoles(["Admin", "Supervisor"]);

  const { id } = useParams();
  const router = useRouter();
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
      if (res) setLeaveData(res);
      else router.push("/dashboard/leave-requests");
      setLoading(false);
    };

    fetchLeave();
  }, [id, router]);

  const handleSubmit = async (data: { status: LeaveStatus }) => {
    await handleUpdate<LeaveRequestResponse, { status: LeaveStatus }>(
      `/api/leaves/${id}/status`,
      "PUT",
      data,
      "Leave Request",
      () => router.push("/dashboard/leave-requests")
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

  return (
    <div className={uiTheme.layout.container}>
      {/* Back Button + Heading */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/leave-requests">
          <Button size="sm" className={uiTheme.buttons.card}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className={uiTheme.text.heading}>Update Leave Request</h1>
      </div>

      {/* Form in Card */}
      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-6`}
      >
        <LeaveForm initialData={leaveData} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
