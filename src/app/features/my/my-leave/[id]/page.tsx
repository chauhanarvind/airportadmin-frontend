"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  LeaveRequestCreate,
  LeaveRequestResponse,
} from "@/app/features/common/leave/LeaveTypes";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { MyLeaveForm } from "../MyLeaveForm";
import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { uiTheme } from "@/app/lib/uiConfig";
import StatusBadge from "@/app/features/common/StatusBadge";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

export default function MyLeaveDetailPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);
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
      `/api/leaves/${id}/resubmit`,
      "PUT",
      data,
      "Leave request"
    );
    if (res) router.push("/features/my/my-leave");
  };

  const handleCancel = async () => {
    const res = await handleUpdate<LeaveRequestResponse, void>(
      `/api/leaves/${id}/cancel?userId=${leave?.userId}`,
      "PUT",
      undefined,
      "Leave request"
    );
    if (res) router.push("/features/my/my-leave");
  };

  if (!leave) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="Leave Request"
        actions={
          <Link href="/features/my/my-leave">
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
        <div className={uiTheme.layout.formGrid}>
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="pt-2">
              <StatusBadge status={leave.status} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Submitted</Label>
            <Input
              value={new Date(leave.createdAt).toLocaleString()}
              disabled
            />
          </div>
        </div>

        {mode === "resubmit" ? (
          <MyLeaveForm
            mode="resubmit"
            defaultValues={{
              startDate: leave.startDate,
              endDate: leave.endDate,
              reason: leave.reason,
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
                type="submit"
                variant="ghost"
                onClick={handleCancel}
                className={uiTheme.buttons.delete}
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
