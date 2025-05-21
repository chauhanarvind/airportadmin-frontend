"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoleSelector from "@/app/components/RoleSelector";
import { useMemo } from "react";
import { format, addDays, startOfWeek } from "date-fns";

export default function StaffingRequestForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedDate = watch("weekStart");

  const weekRange = useMemo(() => {
    if (!selectedDate) return null;
    const monday = startOfWeek(new Date(selectedDate), { weekStartsOn: 1 });
    const sunday = addDays(monday, 6);
    return {
      mondayText: format(monday, "PPP"),
      sundayText: format(sunday, "PPP"),
    };
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Submit Staffing Request</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Week start date */}
        <div className="space-y-1 max-w-md">
          <Label htmlFor="weekStart">Week Start Date</Label>
          <Input
            id="weekStart"
            type="date"
            {...register("weekStart", { required: "Please select a date" })}
          />
          {errors.weekStart && (
            <p className="text-sm text-red-500">{errors.weekStart.message}</p>
          )}
          {weekRange && (
            <p className="text-sm text-muted-foreground">
              Roster for {weekRange.mondayText} – {weekRange.sundayText}
            </p>
          )}
        </div>

        {/* Location selector */}
        <RoleSelector
          label="Location"
          apiUrl="/api/locations/"
          name="locationId"
          optionKey="locationName"
        />
      </div>

      {/* Optional reason */}
      <div className="space-y-1 max-w-md">
        <Label htmlFor="reason">Reason (optional)</Label>
        <Input id="reason" {...register("reason")} />
        {errors.reason && (
          <p className="text-red-500 text-sm">{errors.reason.message}</p>
        )}
      </div>
    </div>
  );
}
