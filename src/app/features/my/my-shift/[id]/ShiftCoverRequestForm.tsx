"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { UserResponse } from "@/app/features/admin/users/UserTypes";
import { MyShift } from "../MyShiftTypes";
import api from "@/app/lib/api";
import { toast } from "sonner";
import { uiTheme } from "@/app/lib/uiConfig";

interface Props {
  shift: MyShift;
  requestId?: number;
  users: UserResponse[];
  isResubmitting?: boolean;
  initialCoveringUserId?: number | null;
  onSuccess: () => void;
}

export default function ShiftCoverRequestForm({
  shift,
  requestId,
  users,
  isResubmitting = false,
  initialCoveringUserId = null,
  onSuccess,
}: Props) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(
    initialCoveringUserId
  );
  const [warnings, setWarnings] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (initialCoveringUserId) {
      setSelectedUserId(initialCoveringUserId);
    }
  }, [initialCoveringUserId]);

  const checkWarnings = async () => {
    if (!selectedUserId) {
      toast.error("Please select a covering user");
      return;
    }

    const payload = {
      shiftId: shift.id,
      coveringUserId: selectedUserId,
      shiftDate: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
    };

    try {
      const res = await api.post<string[]>(
        "/api/cover-requests/check",
        payload
      );
      setWarnings(res.data || []);
      setShowConfirm(true);
    } catch {
      toast.error("Failed to check warnings");
    }
  };

  const submitAnyway = async () => {
    setShowConfirm(false);

    if (!selectedUserId) return;

    const payload = {
      shiftId: shift.id,
      coveringUserId: selectedUserId,
    };

    const url = isResubmitting
      ? `/api/cover-requests/${requestId}/resubmit`
      : "/api/cover-requests";

    const method = isResubmitting ? "PUT" : "POST";

    try {
      await api.request({
        method,
        url,
        data: isResubmitting ? undefined : payload,
      });
      toast.success(
        `Cover request ${isResubmitting ? "resubmitted" : "submitted"}`
      );
      onSuccess();
    } catch {
      toast.error("Failed to submit cover request");
    }
  };

  return (
    <div className="space-y-4">
      {showConfirm && warnings.length > 0 && (
        <div className="p-4 border border-yellow-400 bg-yellow-100 rounded">
          <p className="font-semibold mb-2">Warnings:</p>
          <ul className="list-disc list-inside text-sm text-yellow-800">
            {warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
          <div className="mt-4 space-x-2">
            <Button onClick={submitAnyway} className={uiTheme.buttons.outline}>
              Submit Anyway
            </Button>
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Select Covering User</Label>
        <Select
          onValueChange={(val) => setSelectedUserId(parseInt(val))}
          value={selectedUserId?.toString()}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.firstName} {user.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={checkWarnings} className={uiTheme.buttons.submit}>
        {isResubmitting ? "Resubmit Request" : "Request Cover"}
      </Button>
    </div>
  );
}
