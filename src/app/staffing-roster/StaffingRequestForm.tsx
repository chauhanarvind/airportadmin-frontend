"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        {/* Week Start Date */}
        <div className="space-y-1 max-w-[300px] flex-1">
          <Label htmlFor="weekStart">Week Start Date</Label>
          <Input
            id="weekStart"
            type="date"
            className="max-w-[220px]"
            {...register("weekStart", {
              required: "Please select a date",
            })}
          />
          <div className="min-h-[1.25rem]">
            {typeof errors.weekStart?.message === "string" && (
              <p className="text-sm text-red-500">{errors.weekStart.message}</p>
            )}
          </div>
          {weekRange && (
            <p className="text-sm text-muted-foreground">
              Roster for {weekRange.mondayText} – {weekRange.sundayText}
            </p>
          )}
        </div>

        {/* Location Selector */}
        <div className="space-y-1 max-w-[300px] flex-1">
          <RoleSelector
            label="Location"
            apiUrl="/api/locations/"
            name="locationId"
            optionKey="locationName"
          />
        </div>

        <div className="space-y-1 max-w-[300px] flex-1">
          <RoleSelector
            label="Request Type"
            apiUrl="/api/locations/"
            name="locationId"
            optionKey="locationName"
          />
        </div>

        {/* Reason Textarea */}
        <div className="space-y-1 max-w-[300px] flex-1">
          <Label htmlFor="reason">Reason (optional)</Label>
          <Textarea
            id="reason"
            className="min-h-[80px]"
            placeholder="Explain why this request is needed..."
            {...register("reason")}
          />
          {typeof errors.reason?.message === "string" && (
            <p className="text-sm text-red-500">{errors.reason.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
