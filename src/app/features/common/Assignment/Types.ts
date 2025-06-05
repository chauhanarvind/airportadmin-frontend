// ✅ Replace with this in `StaffingRequestTypes.ts` or new file

export interface Assignment {
  id: number;
  date: string;
  userFullName: string;
  roleName: string;
  startTime: string;
  endTime: string;
  locationName: string;
  unassigned: boolean;
}

export interface GroupedDay {
  date: string;
  assignments: Assignment[];
}
