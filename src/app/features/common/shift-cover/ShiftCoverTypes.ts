// staff/my-shift-cover/MyShiftCoverTypes.ts

export type CoverRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

export interface ShiftCoverRequestDto {
  id?: number; // optional for creation
  originalUserId: number;
  coveringUserId: number;
  shiftDate: string; // ISO format: "YYYY-MM-DD"
  startTime: string; // "HH:MM:SS"
  endTime: string; // "HH:MM:SS"
  status?: CoverRequestStatus;
}

export interface UserSummaryDto {
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
  jobRoleName: string;
  jobLevelName: string;
  constraintProfileName: string;
}

export interface ShiftCoverResponseDto {
  id: number;
  originalUser: UserSummaryDto;
  coveringUser: UserSummaryDto;
  shiftDate: string;
  startTime: string;
  endTime: string;
  status: CoverRequestStatus;
}

export interface CoverEligibilityCheckDto {
  coveringUserId: number;
  shiftDate: string;
  startTime: string;
  endTime: string;
}
