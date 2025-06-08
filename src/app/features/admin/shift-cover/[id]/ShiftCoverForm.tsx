"use client";

import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import { handleUpdate } from "@/app/lib/crudService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/app/features/common/StatusBadge";
import { uiTheme } from "@/app/lib/uiConfig";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  request: ShiftCoverResponseDto;
}

export default function ShiftCoverForm({ request }: Props) {
  const [status, setStatus] = useState(request.status);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const canUpdate = status === "PENDING" || status === "RESUBMITTED";

  const handleStatusUpdate = async (action: "approve" | "reject") => {
    setLoading(true);
    await handleUpdate<void, undefined>(
      `/api/cover-requests/${request.id}/${action}`,
      "PUT",
      undefined,
      "Shift cover request",
      () => {
        const updatedStatus = action === "approve" ? "APPROVED" : "REJECTED";
        setStatus(updatedStatus);
        toast.success(`Request ${updatedStatus.toLowerCase()}`);
        router.push("/features/admin/shift-cover");
      }
    );
    setLoading(false);
  };

  return (
    <div
      className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-6 mt-4`}
    >
      <div className={uiTheme.layout.formGrid}>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input value={request.shiftDate} disabled />
        </div>
        <div className="space-y-2">
          <Label>Start Time</Label>
          <Input value={request.startTime} disabled />
        </div>
        <div className="space-y-2">
          <Label>End Time</Label>
          <Input value={request.endTime} disabled />
        </div>
        <div className="space-y-2">
          <Label>Original User</Label>
          <Input
            value={`${request.originalUser.firstName} ${request.originalUser.lastName}`}
            disabled
          />
        </div>
        <div className="space-y-2">
          <Label>Covering User</Label>
          <Input
            value={`${request.coveringUser.firstName} ${request.coveringUser.lastName}`}
            disabled
          />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <div className="pt-2">
            <StatusBadge status={status} />
          </div>
        </div>
      </div>

      {canUpdate && (
        <div className="flex gap-3">
          <Button
            onClick={() => handleStatusUpdate("approve")}
            disabled={loading}
            className={uiTheme.buttons.submit}
          >
            Approve
          </Button>
          <Button
            onClick={() => handleStatusUpdate("reject")}
            disabled={loading}
            className={uiTheme.buttons.delete}
            variant="ghost"
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
