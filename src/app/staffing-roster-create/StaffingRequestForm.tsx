"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Submit Staffing Request</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row flex-wrap gap-4">
          {/* Week Start Date */}
          <div className="flex flex-col space-y-1 w-[200px]">
            <Label htmlFor="weekStart">Week Start Date</Label>
            <Input
              id="weekStart"
              type="date"
              className="focus:ring-2 focus:ring-blue-500"
              {...register("weekStart", {
                required: "Please select a date",
              })}
            />
            {errors.weekStart && (
              <p className="text-sm text-red-500">
                {errors.weekStart.message as string}
              </p>
            )}
            {weekRange && (
              <p className="text-sm text-muted-foreground">
                Roster for {weekRange.mondayText} – {weekRange.sundayText}
              </p>
            )}
          </div>

          {/* Location Selector */}
          <div className="flex flex-col space-y-1 w-[200px]">
            <RoleSelector
              label="Location"
              apiUrl="/api/locations/"
              name="locationId"
              optionKey="locationName"
              required={true}
            />
          </div>

          {/* Request Type */}
          <div className="flex flex-col space-y-1 w-[200px]">
            <RoleSelector
              label="Request Type"
              name="requestType"
              required={true}
              staticOptions={["REGULAR", "EMERGENCY", "EXTRA", "REPLACEMENT"]}
            />
          </div>

          {/* Reason */}
          <div className="flex flex-col space-y-1 w-[300px]">
            <Label htmlFor="reason">Reason (optional)</Label>
            <Textarea
              id="reason"
              placeholder="Explain why this request is needed..."
              className="min-h-[80px] focus:ring-2 focus:ring-blue-500"
              {...register("reason")}
            />
            {errors.reason && (
              <p className="text-sm text-red-500">
                {errors.reason.message as string}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
