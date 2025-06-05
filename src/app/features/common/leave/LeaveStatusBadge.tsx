import { LeaveStatus, LeaveStatusLabels } from "./LeaveTypes";

interface Props {
  status: LeaveStatus;
}

const statusColors: Record<LeaveStatus, string> = {
  APPROVED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  REJECTED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-800",
  RESUBMITTED: "bg-blue-100 text-blue-800",
};

export default function LeaveStatusBadge({ status }: Props) {
  const label = LeaveStatusLabels[status] ?? status;
  const colorClass = statusColors[status] ?? "bg-muted text-muted-foreground";

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${colorClass}`}>
      {label}
    </span>
  );
}
