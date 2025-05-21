"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WeekPicker from "./WeekPicker";
import RoleSelector from "@/app/components/RoleSelector";

export default function StaffingRequestForm({ replace }: { replace: any }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Submit Staffing Request</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeekPicker replace={replace} />

        <RoleSelector
          label="Location"
          apiUrl="/api/locations/"
          name="locationId"
          optionKey="locationName"
        />
      </div>

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
