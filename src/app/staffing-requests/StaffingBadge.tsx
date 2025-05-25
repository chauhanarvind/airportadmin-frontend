"use client";

import { Badge } from "@/components/ui/badge";

export type Status =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "RESUBMITTED";

export default function StatusBadge({ status }: { status: Status }) {
  const colorMap: Record<Status, string> = {
    PENDING: "bg-yellow-200 text-yellow-800",
    APPROVED: "bg-green-200 text-green-800",
    REJECTED: "bg-red-200 text-red-800",
    CANCELLED: "",
    RESUBMITTED: "",
  };

  return <Badge className={colorMap[status]}>{status}</Badge>;
}
