"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { StaffingRequestCreate } from "../../common/staffing-requests/StaffingRequestTypes";
import DayRosterTable from "./DayRosterTable";

export default function MyStaffingRosterTable() {
  const { control } = useFormContext<StaffingRequestCreate>();

  const { fields: dayFields } = useFieldArray({
    control,
    name: "days",
  });

  if (dayFields.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-4 border rounded-md">
        No staffing days available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {dayFields.map((day, dayIndex) => (
        <DayRosterTable key={day.id} day={day} dayIndex={dayIndex} />
      ))}
    </div>
  );
}
