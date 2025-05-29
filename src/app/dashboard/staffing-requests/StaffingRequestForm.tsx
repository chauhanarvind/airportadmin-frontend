"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  RosterStatus,
  StaffingRequestDetail,
} from "../common/staffing-requests/StaffingRequestTypes";

interface Props {
  request: StaffingRequestDetail;
  onStatusUpdate: (newStatus: RosterStatus) => void;
}

const statusOptions: RosterStatus[] = ["PENDING", "APPROVED", "REJECTED"];

export default function StaffingRequestForm({
  request,
  onStatusUpdate,
}: Props) {
  const [status, setStatus] = useState<RosterStatus>(request.status);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onStatusUpdate(status);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Status Dropdown */}
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={status}
          onValueChange={(val) => setStatus(val as RosterStatus)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="button" onClick={handleSubmit} disabled={loading}>
        Update Status
      </Button>

      {/* Roster Display */}
      <div className="space-y-6 mt-6">
        {request.days.map((day) => (
          <div key={day.id} className="border rounded-md p-4 space-y-2">
            <h3 className="font-semibold">
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </h3>

            {day.items.length === 0 ? (
              <p className="text-muted-foreground">No roles for this day.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th>Job Role</th>
                    <th>Job Level</th>
                    <th>Count</th>
                    <th>Start</th>
                    <th>End</th>
                  </tr>
                </thead>
                <tbody>
                  {day.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.jobRoleName}</td>
                      <td>{item.jobLevelName}</td>
                      <td>{item.requiredCount}</td>
                      <td>{item.startTime}</td>
                      <td>{item.endTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
