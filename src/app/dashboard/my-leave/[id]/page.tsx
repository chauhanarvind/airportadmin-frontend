"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  LeaveRequestCreate,
  LeaveRequestResponse,
} from "@/app/dashboard/common/leave/LeaveTypes";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { MyLeaveForm } from "../MyLeaveForm";
import LeaveStatusBadge from "@/app/dashboard/common/leave/LeaveStatusBadge";
import { uiTheme } from "@/app/lib/uiConfig";

export default function MyLeaveDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [leave, setLeave] = useState<LeaveRequestResponse | null>(null);
  const [mode, setMode] = useState<"view" | "resubmit">("view");

  useEffect(() => {
    const fetchLeave = async () => {
      const data = await handleGetById<LeaveRequestResponse>(
        `/api/leaves/${id}`,
        "Leave Request"
      );
      if (data) {
        setLeave(data);
        if (data.status === "REJECTED" || data.status === "CANCELLED") {
          setMode("resubmit");
        }
      }
    };
    fetchLeave();
  }, [id]);

  const handleResubmit = async (data: LeaveRequestCreate) => {
    const res = await handleUpdate<LeaveRequestResponse, LeaveRequestCreate>(
      `/api/leaves/${id}/resubmit?userId=${data.userId}`,
      "PUT",
      data,
      "Leave request"
    );
    if (res) router.push("/dashboard/my-leave");
  };

  const handleCancel = async () => {
    const res = await handleUpdate<LeaveRequestResponse, void>(
      `/api/leaves/${id}/cancel?userId=${leave?.userId}`,
      "PUT",
      undefined,
      "Leave request"
    );
    if (res) router.push("/dashboard/my-leave");
  };

  if (!leave) return <p className="p-4">Loading...</p>;

  return (
    <div className={uiTheme.layout.container}>
      <h1 className={uiTheme.text.heading}>Leave Request</h1>

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4 space-y-6`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={uiTheme.text.label}>
              Submitted On {new Date(leave.createdAt).toLocaleString()}
            </p>
          </div>
          <LeaveStatusBadge status={leave.status} />
        </div>

        {mode === "resubmit" ? (
          <MyLeaveForm
            mode="resubmit"
            defaultValues={{
              startDate: leave.startDate,
              endDate: leave.endDate,
              reason: leave.reason,
              userId: leave.userId,
            }}
            onSubmit={handleResubmit}
          />
        ) : (
          <div className="space-y-4">
            <div className={uiTheme.layout.formGrid}>
              <div>
                <p className={uiTheme.text.label}>Start Date</p>
                <p>{leave.startDate}</p>
              </div>
              <div>
                <p className={uiTheme.text.label}>End Date</p>
                <p>{leave.endDate}</p>
              </div>
            </div>
            <div>
              <p className={uiTheme.text.label}>Reason</p>
              <p>{leave.reason}</p>
            </div>

            {leave.status === "PENDING" || leave.status === "RESUBMITTED" ? (
              <button
                onClick={handleCancel}
                className="text-sm text-red-600 underline mt-4"
              >
                Cancel Request
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
