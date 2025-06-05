"use client";

import { ShiftCoverResponseDto } from "@/app/features/common/shift-cover/ShiftCoverTypes";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleUpdate } from "@/app/lib/crudService";
import { toast } from "sonner";

interface Props {
  request: ShiftCoverResponseDto;
}

export default function ShiftCoverForm({ request }: Props) {
  const [status, setStatus] = useState(request.status);

  const handleStatusUpdate = async (
    action: "approve" | "reject" | "cancel"
  ) => {
    await handleUpdate<void, undefined>(
      `/api/shift-cover/${request.id}/${action}`,
      "PUT",
      undefined,
      "Shift cover request",
      () => {
        toast.success(`Request ${action}d`);
        setStatus(action.toUpperCase() as typeof request.status);
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Shift Date:</strong> {request.shiftDate}
        </div>
        <div>
          <strong>Time:</strong> {request.startTime} - {request.endTime}
        </div>
        <div>
          <strong>Original User:</strong> {request.originalUser.firstName}{" "}
          {request.originalUser.lastName} ({request.originalUser.email})
        </div>
        <div>
          <strong>Covering User:</strong> {request.coveringUser.firstName}{" "}
          {request.coveringUser.lastName} ({request.coveringUser.email})
        </div>
        <div>
          <strong>Status:</strong> {status}
        </div>
      </div>

      {status === "PENDING" && (
        <div className="flex gap-4 mt-4">
          <Button onClick={() => handleStatusUpdate("approve")}>Approve</Button>
          <Button
            variant="destructive"
            onClick={() => handleStatusUpdate("reject")}
          >
            Reject
          </Button>
        </div>
      )}

      {status === "APPROVED" && (
        <Button
          variant="destructive"
          onClick={() => handleStatusUpdate("cancel")}
        >
          Cancel
        </Button>
      )}
    </div>
  );
}
