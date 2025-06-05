"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleUpdate } from "@/app/lib/crudService";
import { toast } from "sonner";
import { ShiftCoverResponseDto } from "../../common/shift-cover/ShiftCoverTypes";

interface Props {
  requests: ShiftCoverResponseDto[];
}

export default function MyShiftCoverTable({ requests }: Props) {
  const [data, setData] = useState(requests);

  const handleCancel = async (id: number) => {
    const confirmed = confirm("Are you sure you want to cancel this request?");
    if (!confirmed) return;

    await handleUpdate<void, undefined>(
      `/api/shift-cover/${id}/cancel`,
      "PUT",
      undefined,
      "Shift cover request",
      () => {
        toast.success("Request cancelled");
        setData((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: "CANCELLED" } : r))
        );
      }
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Covering User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((req) => (
            <TableRow key={req.id}>
              <TableCell>{req.shiftDate}</TableCell>
              <TableCell>
                {req.startTime} - {req.endTime}
              </TableCell>
              <TableCell>
                {req.coveringUser.firstName} {req.coveringUser.lastName}
              </TableCell>
              <TableCell>{req.status}</TableCell>
              <TableCell>
                {req.status === "PENDING" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancel(req.id)}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
