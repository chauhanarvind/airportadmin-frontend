import { RosterStatus } from "./StaffingRequestTypes";

interface Props {
  status: RosterStatus;
}

const statusColors: Record<RosterStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const statusLabels: Record<RosterStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export default function RosterStatusBadge({ status }: Props) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
