import { RosterStatus } from "./StaffingRequestTypes";

export const RosterStatusLabels: Record<RosterStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};
