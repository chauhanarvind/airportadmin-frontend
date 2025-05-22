import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";

export type StaffingItem = {
  day: string;
  jobRoleId: number | null;
  jobLevelId: number | null;
  requiredCount: number;
  startTime: string;
  endTime: string;
};

export type CleanedStaffingItem = Omit<StaffingItem, "day">;

export type StaffingRosterTableProps = {
  fields: FieldArrayWithId<StaffingRequestFormData, "items", "id">[];
  append: UseFieldArrayAppend<StaffingRequestFormData, "items">;
  remove: UseFieldArrayRemove;
};

export type StaffingRequestFormData = {
  locationId: number | null;
  requestType: string | null;
  reason: string;
  weekStart?: string;
  items: StaffingItem[];
};

export type StaffingDay = {
  date: string;
  items: CleanedStaffingItem[];
};

export type StaffingRequestPayload = {
  managerId: number | null;
  locationId: number;
  requestType: string;
  status: string;
  reason: string;
  days: StaffingDay[];
};
