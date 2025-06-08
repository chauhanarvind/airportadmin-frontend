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

import {
  StaffingRequestResponse,
  RequestTypeLabels,
} from "./StaffingRequestTypes";
import StatusBadge from "../StatusBadge";

interface StaffingRequestTableProps {
  data: StaffingRequestResponse[];
  loading: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  basePath?: string;
  clickableRows?: boolean; //clickable to update status for admin
}

export default function StaffingRequestTable({
  data,
  loading,
  page,
  totalPages,
  onPageChange,
  basePath = "staffing-requests",
  clickableRows = true,
}: StaffingRequestTableProps) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((req) => (
            <TableRow
              key={req.id}
              className={
                clickableRows
                  ? "hover:bg-blue-100 cursor-pointer transition"
                  : ""
              }
              onClick={
                clickableRows
                  ? () => router.push(`/features/${basePath}/${req.id}`)
                  : undefined
              }
            >
              <TableCell>{req.locationName}</TableCell>
              <TableCell>
                {req.managerFirstName} {req.managerLastName}
              </TableCell>
              <TableCell>{RequestTypeLabels[req.requestType]}</TableCell>
              <TableCell>
                <StatusBadge status={req.status} />
              </TableCell>
              <TableCell>{new Date(req.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}

          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-muted-foreground"
              >
                No staffing requests found.
              </TableCell>
            </TableRow>
          )}

          {loading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
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
