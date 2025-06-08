"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { handleGetById, handleUpdate } from "@/app/lib/crudService";
import { uiTheme } from "@/app/lib/uiConfig";
import {
  RosterStatus,
  StaffingRequestDetail,
  StaffingRequestUpdate,
} from "@/app/features/common/staffing-requests/StaffingRequestTypes";
import { useRequireRoles } from "@/app/lib/useRequireRoles";

interface Props {
  onStatusUpdated?: () => void;
}

export default function AdminStatusUpdateForm({ onStatusUpdated }: Props) {
  useRequireRoles(["Admin"]);
  const { id } = useParams();
  const requestId = id as string;

  const [selectedStatus, setSelectedStatus] = useState<RosterStatus>("PENDING");
  const [currentStatus, setCurrentStatus] = useState<RosterStatus>("PENDING");

  useEffect(() => {
    const fetchStatus = async () => {
      const req = await handleGetById<StaffingRequestDetail>(
        `/api/staffing-requests/${requestId}`,
        "Staffing request"
      );
      if (req) {
        setSelectedStatus(req.status);
        setCurrentStatus(req.status);
      }
    };

    fetchStatus();
  }, [requestId]);

  const handleSubmit = async () => {
    const payload: StaffingRequestUpdate = { status: selectedStatus };

    await handleUpdate(
      `/api/staffing-requests/status/${requestId}`,
      "PUT",
      payload,
      "Staffing request",
      async () => {
        toast.success("Status updated");
        setCurrentStatus(selectedStatus);
        onStatusUpdated?.();
      }
    );
  };

  return (
    <div
      className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} mt-4 space-y-4`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="sm:w-64 space-y-1.5">
          <label htmlFor="status" className={uiTheme.text.label}>
            Status
          </label>
          <Select
            value={selectedStatus}
            onValueChange={(val) => setSelectedStatus(val as RosterStatus)}
          >
            <SelectTrigger className={uiTheme.components.select.trigger}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className={uiTheme.components.select.content}>
              {["PENDING", "APPROVED", "REJECTED"].map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                  className={uiTheme.components.select.item}
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className={uiTheme.layout.formGrid}>
          <Button
            onClick={handleSubmit}
            disabled={selectedStatus === currentStatus}
            className={uiTheme.buttons.action}
          >
            Update Status
          </Button>
        </div>
      </div>
    </div>
  );
}
