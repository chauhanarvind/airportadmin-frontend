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

import { handleFetchList } from "@/app/lib/crudService";
import {
  RequestTypeLabels,
  StaffingRequestResponse,
} from "./StaffingRequestTypes";
import RosterStatusBadge from "./RosterStatusBadge";

interface StaffingRequestTableProps {
  filters?: {
    userId?: string;
  };
  basePath?: string; // e.g. "my-staffing-requests" or "staffing-requests"
  clickableRows?: boolean; // allow row click navigation (default: true)
}

export default function StaffingRequestTable({
  filters,
  basePath = "staffing-requests",
  clickableRows = true,
}: StaffingRequestTableProps) {
  const [requests, setRequests] = useState<StaffingRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchRequests = async () => {
    setLoading(true);

    let url = "/api/staffing-requests/";
    if (filters?.userId) {
      url = `/api/staffing-requests/user/${filters.userId}`;
    }

    const data = await handleFetchList<StaffingRequestResponse[]>(
      url,
      "Staffing requests"
    );
    if (data) setRequests(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, [filters?.userId]);

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
          {requests.map((req) => (
            <TableRow
              key={req.id}
              className={
                clickableRows
                  ? "hover:bg-blue-100 cursor-pointer transition"
                  : ""
              }
              onClick={
                clickableRows
                  ? () => router.push(`/dashboard/${basePath}/${req.id}`)
                  : undefined
              }
            >
              <TableCell>{req.locationName}</TableCell>
              <TableCell>{`${req.managerFirstName} ${req.managerLastName}`}</TableCell>
              <TableCell>{RequestTypeLabels[req.requestType]}</TableCell>
              <TableCell>
                <RosterStatusBadge status={req.status} />
              </TableCell>
              <TableCell>{new Date(req.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}

          {!loading && requests.length === 0 && (
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
    </div>
  );
}
