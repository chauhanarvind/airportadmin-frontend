"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import { handleUpdate } from "@/app/lib/crudService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/app/features/common/StatusBadge";
import { uiTheme } from "@/app/lib/uiConfig";
import api from "@/app/lib/api";

interface Props {
  request: ShiftCoverResponseDto;
}

export default function ShiftCoverForm({ request }: Props) {
  const [status, setStatus] = useState(request.status);
  const [loading, setLoading] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const canUpdate = status === "PENDING" || status === "RESUBMITTED";

  const checkWarnings = async () => {
    try {
      const res = await api.get<string[]>(
        `/cover-requests/${request.id}/warnings`
      );
      setWarnings(res.data || []);
      setShowConfirm(true);
    } catch {
      toast.error("Failed to fetch warnings");
    }
  };

  const handleStatusUpdate = async (action: "approve" | "reject") => {
    setLoading(true);
    await handleUpdate<void, undefined>(
      `/cover-requests/${request.id}/${action}`,
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

  const confirmAndApprove = async () => {
    setShowConfirm(false);
    await handleStatusUpdate("approve");
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

      {showConfirm && warnings.length > 0 && (
        <div className="p-4 border border-yellow-400 bg-yellow-100 rounded">
          <p className="font-semibold mb-2">Warnings:</p>
          <ul className="list-disc list-inside text-sm text-yellow-800">
            {warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
          <div className="mt-4 space-x-2">
            <Button
              onClick={confirmAndApprove}
              className={uiTheme.buttons.outline}
            >
              Approve Anyway
            </Button>
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {canUpdate && !showConfirm && (
        <div className={uiTheme.layout.formGrid}>
          <Button
            onClick={checkWarnings}
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
