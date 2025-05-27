"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import StatusBadge from "./StaffingBadge";

export type StaffingRequest = {
  createdAt: string;
  locationId: number;
  locationName: string;
  managerFirstName: string;
  managerId: number;
  managerLastName: string;
  reason: string;
  requestType: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "RESUBMITTED";
  id: number;
};

type Props = {
  data: StaffingRequest[];
  loading: boolean;
};

export default function StaffingRequestsTable({ data, loading }: Props) {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/staffing-requests/${id}`);
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return <p className="text-muted-foreground">No staffing requests found.</p>;
  }

  return (
    <div className="border rounded-md overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Manager</th>
            <th className="p-3">Manager ID</th>
            <th className="p-3">Location</th>
            <th className="p-3">Type</th>
            <th className="p-3">Created</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((req) => (
            <tr
              key={req.id}
              onClick={() => handleRowClick(req.id)}
              className="cursor-pointer hover:bg-muted/50 transition"
            >
              <td className="p-3">{req.id}</td>
              <td className="p-3">
                {req.managerFirstName} {req.managerLastName}
              </td>
              <td className="p-3">{req.managerId}</td>
              <td className="p-3">{req.locationName}</td>
              <td className="p-3">{req.requestType}</td>
              <td className="p-3">
                {new Date(req.createdAt).toLocaleString()}
              </td>
              <td className="p-3">
                <StatusBadge status={req.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
