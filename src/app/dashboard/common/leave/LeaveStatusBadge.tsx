import { Badge } from "@/components/ui/badge";
import { LeaveStatus } from "./LeaveTypes";

interface Props {
  status: LeaveStatus;
}

export default function LeaveStatusBadge({ status }: Props) {
  const { color, text } = getStatusStyle(status);

  return (
    <Badge className={`${color} uppercase font-semibold text-xs`}>{text}</Badge>
  );
}

function getStatusStyle(status: LeaveStatus) {
  switch (status) {
    case "PENDING":
      return { color: "bg-yellow-100 text-yellow-800", text: "Pending" };
    case "APPROVED":
      return { color: "bg-green-100 text-green-800", text: "Approved" };
    case "REJECTED":
      return { color: "bg-red-100 text-red-800", text: "Rejected" };
    case "CANCELLED":
      return { color: "bg-gray-200 text-gray-700", text: "Cancelled" };
    default:
      return { color: "bg-muted", text: status };
  }
}
