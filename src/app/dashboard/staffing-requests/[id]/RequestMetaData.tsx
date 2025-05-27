"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import StatusBadge from "../StaffingBadge";
import { StaffingRequestDetail, Status } from "./staffing";
import { handleUpdate } from "@/app/lib/crudService";

type Props = {
  data: StaffingRequestDetail;
};

export default function RequestMetaData({ data }: Props) {
  const [status, setStatus] = useState<Status>(data.status);
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (newStatus: Status) => {
    setLoading(true);

    await handleUpdate<Status>(
      `/api/staffing-requests/${data.id}/status?status=${newStatus}`,
      "PUT",
      null,
      "Roster status",
      (updatedStatus) => {
        setStatus(updatedStatus);
      }
    );

    setLoading(false);
  };

  return (
    <div className="border rounded-md p-4 space-y-3">
      <div className="flex flex-wrap gap-6 text-sm">
        <div>
          <strong>Request ID:</strong> {data.id}
        </div>
        <div>
          <strong>Manager:</strong> {data.managerFirstName}{" "}
          {data.managerLastName} (ID: {data.managerId})
        </div>
        <div>
          <strong>Location:</strong> {data.locationName}
        </div>
        <div>
          <strong>Type:</strong> {data.requestType}
        </div>
        <div>
          <strong>Status:</strong> <StatusBadge status={status} />
        </div>
        <div>
          <strong>Created At:</strong>{" "}
          {new Date(data.createdAt).toLocaleString()}
        </div>
        <div>
          <strong>Reason:</strong> {data.reason || "—"}
        </div>
      </div>

      {/* Status update buttons (optional role check can be added here) */}
      {status === "PENDING" && (
        <div className="flex gap-3 pt-2">
          <Button
            onClick={() => handleUpdateStatus("APPROVED")}
            disabled={loading}
          >
            Approve
          </Button>
          <Button
            onClick={() => handleUpdateStatus("REJECTED")}
            variant="destructive"
            disabled={loading}
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}
