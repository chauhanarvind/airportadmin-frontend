"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { uiTheme } from "@/app/lib/uiConfig";
import MyStaffingRosterTable from "./MyStaffingRosterTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StaffingRequestCreate } from "../common/staffing-requests/StaffingRequestTypes";
import WeekPicker from "../common/staffing-requests/WeekPicker";

interface Props {
  onSubmit: (data: StaffingRequestCreate) => void;
}

export default function MyStaffingRequestForm({ onSubmit }: Props) {
  const methods = useForm<StaffingRequestCreate>({
    defaultValues: {
      locationId: undefined,
      requestType: "REGULAR",
      reason: "",
      days: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const days = watch("days");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="locationId" className={uiTheme.text.label}>
            Location ID
          </Label>
          <Input
            id="locationId"
            type="number"
            {...register("locationId", { required: "Location is required" })}
          />
          {errors.locationId && (
            <p className="text-red-500 text-sm">{errors.locationId.message}</p>
          )}
        </div>

        {/* Request Type */}
        <div className="space-y-2">
          <Label className={uiTheme.text.label}>Request Type</Label>
          <Select
            defaultValue="REGULAR"
            onValueChange={(val) =>
              setValue("requestType", val as "REGULAR" | "EMERGENCY")
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="REGULAR">Regular</SelectItem>
              <SelectItem value="EMERGENCY">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <Label htmlFor="reason" className={uiTheme.text.label}>
            Reason (optional)
          </Label>
          <Input id="reason" {...register("reason")} />
        </div>

        {/* Week Picker */}
        <WeekPicker onWeekChange={(weekDays) => setValue("days", weekDays)} />

        {/* Roster Table */}
        {days.length > 0 && <MyStaffingRosterTable />}

        <Button
          type="submit"
          className={uiTheme.colors.primary}
          disabled={isSubmitting}
        >
          Submit Request
        </Button>
      </form>
    </FormProvider>
  );
}
