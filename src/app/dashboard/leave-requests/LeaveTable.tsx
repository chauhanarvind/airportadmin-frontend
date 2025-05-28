"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { LeaveRequestResponse } from "@/app/dashboard/common/leave/LeaveTypes";
import LeaveStatusBadge from "@/app/dashboard/common/leave/LeaveStatusBadge";

interface Props {
  data: LeaveRequestResponse[];
}

export default function LeaveTable({ data }: Props) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((leave) => (
            <TableRow
              key={leave.id}
              className="hover:bg-blue-100 transition cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/leave-requests/${leave.id}`)
              }
            >
              <TableCell>{leave.userName ?? `User ${leave.userId}`}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>{leave.startDate}</TableCell>
              <TableCell>{leave.endDate}</TableCell>
              <TableCell>
                <LeaveStatusBadge status={leave.status} />
              </TableCell>
              <TableCell>
                {new Date(leave.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-muted-foreground"
              >
                No leave requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
