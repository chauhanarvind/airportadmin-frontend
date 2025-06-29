"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LeaveRequestResponse } from "./LeaveTypes";
import StatusBadge from "../StatusBadge";

interface LeaveTableProps {
  data: LeaveRequestResponse[];
  loading: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  basePath?: string;
  clickable?: boolean;
}

export default function LeaveTable({
  data,
  loading,
  page,
  totalPages,
  onPageChange,
  basePath,
  clickable,
}: LeaveTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>

            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((leave) => (
            <TableRow
              key={leave.id}
              className={
                clickable ? "hover:bg-blue-100 transition cursor-pointer" : ""
              }
              onClick={
                clickable
                  ? () => router.push(`/features/${basePath}/${leave.id}`)
                  : undefined
              }
            >
              <TableCell>{leave.userName ?? `User ${leave.userId}`}</TableCell>
              <TableCell>{leave.startDate}</TableCell>
              <TableCell>{leave.endDate}</TableCell>
              <TableCell>
                <StatusBadge status={leave.status} />
              </TableCell>

              <TableCell>
                {new Date(leave.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}

          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-muted-foreground"
              >
                No leave requests found.
              </TableCell>
            </TableRow>
          )}

          {loading && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {typeof page === "number" &&
        typeof totalPages === "number" &&
        typeof onPageChange === "function" && (
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              disabled={page === 0}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page + 1 >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
    </div>
  );
}
