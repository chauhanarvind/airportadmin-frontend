"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { StaffingRequestCreate } from "../common/staffing-requests/StaffingRequestTypes";
import DayRosterTable from "./DayRosterTable";

export default function MyStaffingRosterTable() {
  const { control } = useFormContext<StaffingRequestCreate>();

  const { fields: dayFields } = useFieldArray({
    control,
    name: "days",
  });

  return (
    <div className="space-y-8">
      {dayFields.map((day, dayIndex) => (
        <DayRosterTable key={day.id} day={day} dayIndex={dayIndex} />
      ))}
    </div>
  );
}
