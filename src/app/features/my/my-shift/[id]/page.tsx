"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import PageContainer from "@/app/components/layout/PageContainer";
import PageHeader from "@/app/components/ui/PageHeader";
import PageLoader from "@/app/components/ui/PageLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { handleFetchList, handleUpdate } from "@/app/lib/crudService";
import { useRequireRoles } from "@/app/lib/useRequireRoles";
import { uiTheme } from "@/app/lib/uiConfig";

import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import { MyShift } from "../MyShiftTypes";
import { UserResponse } from "@/app/features/admin/users/UserTypes";
import StatusBadge from "@/app/features/common/StatusBadge";
import ShiftCoverRequestForm from "./ShiftCoverRequestForm"; // make sure path is correct

export default function ShiftCoverDetailPage() {
  useRequireRoles(["Admin", "Manager", "Supervisor", "Crew"]);

  const { id } = useParams();
  const router = useRouter();

  const [shift, setShift] = useState<MyShift | null>(null);
  const [coverRequest, setCoverRequest] =
    useState<ShiftCoverResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [coveringUsers, setCoveringUsers] = useState<UserResponse[] | null>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [shiftData, requestData, users] = await Promise.all([
        handleFetchList<MyShift>(`/api/roster/${id}`, "Shift"),
        handleFetchList<ShiftCoverResponseDto>(
          `/api/cover-requests/shift/${id}`,
          "Cover request"
        ),
        handleFetchList<UserResponse[]>("/api/users/summaries", "Users"),
      ]);
      setShift(shiftData ?? null);
      setCoverRequest(requestData || null);
      setCoveringUsers(users ?? null);
      setLoading(false);
    };

    if (id) loadData();
  }, [id]);

  const handleCancelRequest = async () => {
    if (!coverRequest) return;

    await handleUpdate(
      `/api/cover-requests/${coverRequest.id}/cancel`,
      "PUT",
      undefined,
      "Cover request",
      () => {
        toast.success("Request cancelled");
        router.refresh();
      }
    );
  };

  if (loading || !shift) return <PageLoader />;

  return (
    <PageContainer>
      <PageHeader
        title="Shift Cover Request"
        actions={
          <Link href="/features/my/my-shift">
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
              {coverRequest && <StatusBadge status={coverRequest.status} />}
            </div>
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Date</Label>
            <Input value={shift.date} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Start Time</Label>
            <Input value={shift.startTime} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>End Time</Label>
            <Input value={shift.endTime} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Role</Label>
            <Input value={shift.roleName} disabled />
          </div>
          <div className="space-y-2">
            <Label className={uiTheme.text.label}>Location</Label>
            <Input value={shift.locationName} disabled />
          </div>
        </div>

        <div className="space-y-4">
          {coverRequest ? (
            <>
              <div className={uiTheme.layout.formGrid}>
                <div className="space-y-2">
                  <Label className={uiTheme.text.label}>Covering User</Label>
                  <Input
                    value={`${coverRequest.coveringUser?.firstName} ${coverRequest.coveringUser?.lastName}`}
                    disabled
                  />
                </div>
              </div>

              {coverRequest.status === "PENDING" && (
                <Button
                  variant="ghost"
                  onClick={handleCancelRequest}
                  className={uiTheme.buttons.delete}
                >
                  Cancel Request
                </Button>
              )}

              {["CANCELLED", "RESUBMITTED"].includes(coverRequest.status) && (
                <ShiftCoverRequestForm
                  shift={shift}
                  users={coveringUsers || []}
                  requestId={coverRequest.id}
                  isResubmitting
                  initialCoveringUserId={coverRequest.coveringUser?.id || null}
                  onSuccess={() => router.refresh()}
                />
              )}

              {(coverRequest.status === "APPROVED" ||
                coverRequest.status === "REJECTED") && (
                <p className="text-sm text-muted-foreground italic">
                  This request is {coverRequest.status.toLowerCase()} and cannot
                  be changed.
                </p>
              )}
            </>
          ) : (
            <ShiftCoverRequestForm
              shift={shift}
              users={coveringUsers || []}
              onSuccess={() => router.refresh()}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
