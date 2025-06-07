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

import { StaffAvailabilityResponse } from "./StaffAvailabilityTypes";
import AvailabilityStatusBadge from "./AvailabilityStatusBadge";

interface StaffAvailabilityTableProps {
  data: StaffAvailabilityResponse[];
  loading: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  basePath?: string;
  clickableRows?: boolean;
}

export default function StaffAvailabilityTable({
  data,
  loading,
  page,
  totalPages,
  onPageChange,
  clickableRows = false,
  basePath = "staff-availability",
}: StaffAvailabilityTableProps) {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    if (clickableRows) router.push(`/features/admin/${basePath}/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Available?</TableHead>
            <TableHead>Unavailable From</TableHead>
            <TableHead>Unavailable To</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-muted-foreground"
              >
                No availability records found.
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

          {data.map((entry) => (
            <TableRow
              key={entry.id}
              className={
                clickableRows
                  ? "hover:bg-blue-100 transition cursor-pointer"
                  : ""
              }
              onClick={() => handleRowClick(entry.id)}
            >
              <TableCell>{entry.userName ?? `User ${entry.userId}`}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>
                <AvailabilityStatusBadge available={entry.isAvailable} />
              </TableCell>
              <TableCell>{entry.unavailableFrom ?? "-"}</TableCell>
              <TableCell>{entry.unavailableTo ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
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
