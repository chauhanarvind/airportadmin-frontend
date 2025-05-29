export interface FlatRosterAssignment {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  userFullName: string;
  roleName: string;
  locationName: string;
  unassigned: boolean;
}

export interface GroupedRosterAssignment {
  date: string;
  assignments: FlatRosterAssignment[];
}

export interface TransformedRoster {
  days: GroupedRosterAssignment[];
}

/**
 * Groups a flat list of roster assignments by date.
 */
export function transformFlatRoster(
  flatList: FlatRosterAssignment[]
): TransformedRoster {
  const grouped = flatList.reduce((acc, assignment) => {
    const date = assignment.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(assignment);
    return acc;
  }, {} as Record<string, FlatRosterAssignment[]>);

  const days = Object.entries(grouped).map(([date, assignments]) => ({
    date,
    assignments,
  }));

  return { days };
}
