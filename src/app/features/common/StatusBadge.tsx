import React from "react";
import { cn } from "@/lib/utils"; // or use `clsx` if you don't have `cn`

interface Props {
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "RESUBMITTED";
}

const statusMap: Record<Props["status"], { label: string; className: string }> =
  {
    PENDING: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800",
    },
    APPROVED: {
      label: "Approved",
      className: "bg-green-100 text-green-700",
    },
    REJECTED: {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-gray-200 text-gray-700",
    },
    RESUBMITTED: {
      label: "Resubmitted",
      className: "bg-blue-100 text-blue-700",
    },
  };

export default function StatusBadge({ status }: Props) {
  const { label, className } = statusMap[status] || {
    label: status,
    className: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={cn("px-2 py-0.5 rounded-full text-xs font-medium", className)}
    >
      {label}
    </span>
  );
}
