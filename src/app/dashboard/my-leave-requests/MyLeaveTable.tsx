"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveRequestResponse } from "@/app/dashboard/common/leave/LeaveTypes";
import LeaveStatusBadge from "@/app/dashboard/common/leave/LeaveStatusBadge";
import { useRouter } from "next/navigation";

interface Props {
  data: LeaveRequestResponse[];
}

export default function MyLeaveTable({ data }: Props) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
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
              className="hover:bg-blue-50 transition cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/my-leave-requests/${leave.id}`)
              }
            >
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
                colSpan={5}
                className="text-center text-muted-foreground py-6"
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
