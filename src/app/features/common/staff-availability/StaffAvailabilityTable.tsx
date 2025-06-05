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

import { StaffAvailabilityResponse } from "./StaffAvailabilityTypes";
import { handleFetchList } from "@/app/lib/crudService";

interface StaffAvailabilityTableProps {
  filters?: {
    userId?: string;
  };
  basePath?: string; // e.g., "staff-availability" or "my-staff-availability"
  clickableRows?: boolean;
}

export default function StaffAvailabilityTable({
  filters,
  basePath,
  clickableRows,
}: StaffAvailabilityTableProps) {
  const [entries, setEntries] = useState<StaffAvailabilityResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchAvailability = async () => {
    setLoading(true);

    let url = "/api/staff-availability/";
    if (filters?.userId) {
      // Use user-specific endpoint if userId is present
      url = `/api/staff-availability/user/${filters.userId}`;
    }

    const data = await handleFetchList<StaffAvailabilityResponse[]>(
      url,
      "Staff availability"
    );

    if (data) setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

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
          {entries.map((entry) => (
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
              <TableCell>{entry.userName ?? `User ${entry.userId}`}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.isAvailable ? "Yes" : "No"}</TableCell>
              <TableCell>{entry.unavailableFrom ?? "-"}</TableCell>
              <TableCell>{entry.unavailableTo ?? "-"}</TableCell>
            </TableRow>
          ))}

          {!loading && entries.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-6 text-muted-foreground"
              >
                No availability entries found.
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
    </div>
  );
}
