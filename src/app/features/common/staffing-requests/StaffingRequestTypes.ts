// -------------- Enums (match your Java enums) --------------
export type RequestType = "REGULAR" | "EMERGENCY";
export type RosterStatus = "PENDING" | "APPROVED" | "REJECTED";

// -------------- Create DTOs --------------

export interface StaffingRequestItemCreate {
  jobRoleId: number;
  jobLevelId: number;
  requiredCount: number;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

export interface StaffingRequestDayCreate {
  date: string; // "YYYY-MM-DD"
  items: StaffingRequestItemCreate[];
}

export interface StaffingRequestCreate {
  managerId: number;
  locationId: number;
  requestType?: RequestType;
  reason?: string;
  days: StaffingRequestDayCreate[];
}

// -------------- Response DTOs --------------

export interface StaffingRequestResponse {
  id: number;
  managerId: number;
  managerFirstName: string;
  managerLastName: string;
  locationId: number;
  locationName: string;
  reason?: string;
  requestType: RequestType;
  createdAt: string; // ISO timestamp
  status: RosterStatus;
}

export interface StaffingRequestItemResponse {
  id: number;
  jobRoleName: string;
  jobLevelName: string;
  requiredCount: number;
  startTime: string;
  endTime: string;
}

export interface StaffingRequestDayDetail {
  id: number;
  date: string;
  items: StaffingRequestItemResponse[];
}

export interface StaffingRequestDetail {
  id: number;
  managerId: number;
  managerFirstName: string;
  managerLastName: string;
  locationId: number;
  locationName: string;
  reason?: string;
  requestType: RequestType;
  status: RosterStatus;
  createdAt: string;
  days: StaffingRequestDayDetail[];
}

// -------------- Status Update DTO --------------

export interface StaffingRequestUpdate {
  status: RosterStatus;
}

export const RequestTypeLabels: Record<RequestType, string> = {
  REGULAR: "Regular",
  EMERGENCY: "Emergency",
};

// -------------- Generated Roster DTOs --------------

export interface StaffingAssignmentItem {
  id: number;
  jobRoleName: string;
  jobLevelName: string;
  startTime: string;
  endTime: string;
  userFullName: string | null;
  unassigned: boolean;
}

export interface StaffingAssignmentDay {
  id: number;
  date: string;
  items: StaffingAssignmentItem[];
}

export interface StaffingAssignmentDetail {
  requestId: number;
  locationName: string;
  days: StaffingAssignmentDay[];
}

export interface StaffingAssignmentItem {
  id: number;
  jobRoleName: string;
  jobLevelName: string;
  startTime: string;
  endTime: string;
  userFullName: string | null;
  unassigned: boolean;
}

export interface StaffingAssignmentDay {
  id: number;
  date: string;
  items: StaffingAssignmentItem[];
}

export interface StaffingAssignmentDetail {
  requestId: number;
  locationName: string;
  days: StaffingAssignmentDay[];
}
