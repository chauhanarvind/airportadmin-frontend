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
  userName?: string; // for display only
  reason: string;
  createdAt: string; // ISO datetime string
}

// Enum for LeaveStatus
export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
