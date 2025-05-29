"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  LeaveRequestCreate,
  LeaveRequestResponse,
} from "@/app/dashboard/common/leave/LeaveTypes";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { MyLeaveForm } from "../MyLeaveForm";
import LeaveStatusBadge from "@/app/dashboard/common/leave/LeaveStatusBadge";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

  if (!leave) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="Leave Request"
        actions={
          <Link href="/dashboard/my-leave">
            <Button size="sm" className={uiTheme.buttons.back}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        }
      />

      <div
        className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4 space-y-6`}
      >
        <div className="flex items-center justify-between">
          <p className={uiTheme.text.label}>
            Submitted On {new Date(leave.createdAt).toLocaleString()}
          </p>
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
              <div className="space-y-2">
                <Label className={uiTheme.text.label}>Start Date</Label>
                <Input value={leave.startDate} disabled />
              </div>
              <div className="space-y-2">
                <Label className={uiTheme.text.label}>End Date</Label>
                <Input value={leave.endDate} disabled />
              </div>
            </div>

            <div className="space-y-2">
              <Label className={uiTheme.text.label}>Reason</Label>
              <Input value={leave.reason} disabled />
            </div>

            {(leave.status === "PENDING" || leave.status === "RESUBMITTED") && (
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="text-red-600 text-sm underline px-0"
              >
                Cancel Request
              </Button>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
