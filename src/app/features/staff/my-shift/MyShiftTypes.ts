export interface MyShift {
  id: number;
  date: string;
  roleName: string;
  startTime: string;
  endTime: string;
  locationName: string;
  userFullName?: string;
  unassigned?: boolean;
}

export interface CoveringUserOption {
  id: number;
  firstName: string;
  lastName: string;
}
