// Matches LeaveRequestCreateDto
export interface LeaveRequestCreate {
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  userId: number;
  reason: string;
}

// Matches LeaveRequestUpdateDto
export interface LeaveRequestUpdate {
  status: LeaveStatus;
}

// Matches LeaveRequestGetDto
export interface LeaveRequestResponse {
  id: number;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  userId: number;
  userName?: string; // optional, for display
  reason: string;
  createdAt: string; // ISO format
}

// Enum for status
export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  RESUBMITTED = "RESUBMITTED",
}

// UI labels
export const LeaveStatusLabels: Record<LeaveStatus, string> = {
  [LeaveStatus.PENDING]: "Pending",
  [LeaveStatus.APPROVED]: "Approved",
  [LeaveStatus.REJECTED]: "Rejected",
  [LeaveStatus.CANCELLED]: "Cancelled",
  [LeaveStatus.RESUBMITTED]: "Resubmitted",
};

// UI dropdown options
export const LeaveStatusOptions = Object.entries(LeaveStatusLabels).map(
  ([value, label]) => ({ value, label })
);
