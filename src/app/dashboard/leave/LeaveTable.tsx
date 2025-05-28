"use client";

import { useEffect, useState } from "react";
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

import { handleFetchPaged } from "@/app/lib/crudService";
import { LeaveRequestResponse } from "../common/leave/LeaveTypes";
import LeaveStatusBadge from "../common/leave/LeaveStatusBadge";

interface LeaveTableProps {
  filters?: {
    userId?: string;
    status?: string;
  };
}

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export default function LeaveTable({ filters }: LeaveTableProps) {
  const [leaves, setLeaves] = useState<LeaveRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters?.userId) query.append("userId", filters.userId);
      if (filters?.status && filters.status !== "ALL") {
        query.append("status", filters.status);
      }

      query.append("page", page.toString());
      query.append("size", "10");

      const data = await handleFetchPaged<
        PaginatedResponse<LeaveRequestResponse>
      >(`/api/leaves/?${query.toString()}`, "Leave Requests");

      if (data) {
        setLeaves(data.content);
        setTotalPages(data.totalPages);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0); // Reset to first page when filters change
  }, [filters?.userId, filters?.status]);

  useEffect(() => {
    fetchLeaves();
  }, [filters?.userId, filters?.status, page]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leaves.map((leave) => (
            <TableRow
              key={leave.id}
              className="hover:bg-blue-100 transition cursor-pointer"
              onClick={() => router.push(`/dashboard/leave/${leave.id}`)}
            >
              <TableCell>{leave.userName ?? `User ${leave.userId}`}</TableCell>
              <TableCell>{leave.startDate}</TableCell>
              <TableCell>{leave.endDate}</TableCell>
              <TableCell>
                <LeaveStatusBadge status={leave.status} />
              </TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                {new Date(leave.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}

          {!loading && leaves.length === 0 && (
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

      {/* Pagination Controls */}
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
