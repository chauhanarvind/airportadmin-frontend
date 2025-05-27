export type Status =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "RESUBMITTED";

export type StaffingRequestDetail = {
  id: number;
  managerId: number;
  managerFirstName: string;
  managerLastName: string;
  locationId: number;
  locationName: string;
  requestType: string;
  reason: string;
  status: Status;
  createdAt: string;
  days: StaffingRequestDay[];
};

export type StaffingRequestDay = {
  id: number;
  date: string; // ISO string like "2025-06-01"
  items: StaffingRequestItem[];
};

export type StaffingRequestItem = {
  id: number;
  jobRoleName: string;
  jobLevelName: string;
  requiredCount: number;
  startTime: string; // "HH:mm:ss"
  endTime: string; // "HH:mm:ss"
};
