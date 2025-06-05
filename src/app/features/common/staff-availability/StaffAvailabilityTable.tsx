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
import { StaffAvailabilityResponse } from "./StaffAvailabilityTypes";
import AvailabilityStatusBadge from "./AvailabilityStatusBadge";

interface StaffAvailabilityTableProps {
  basePath?: string; // e.g., "staff-availability" or "my-staff-availability"
  clickableRows?: boolean;
  data: StaffAvailabilityResponse[];
}

export default function StaffAvailabilityTable({
  basePath,
  clickableRows,
  data,
}: StaffAvailabilityTableProps) {
  const router = useRouter();

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
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No availability records found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((entry) => (
              <TableRow
                key={entry.id}
                className={
                  clickableRows
                    ? "hover:bg-blue-100 transition cursor-pointer"
                    : ""
                }
                onClick={
                  clickableRows
                    ? () => router.push(`/dashboard/${basePath}/${entry.id}`)
                    : undefined
                }
              >
                <TableCell>
                  {entry.userName ?? `User ${entry.userId}`}
                </TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>
                  <AvailabilityStatusBadge available={entry.isAvailable} />
                </TableCell>

                <TableCell>{entry.unavailableFrom ?? "-"}</TableCell>
                <TableCell>{entry.unavailableTo ?? "-"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
