"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { uiTheme } from "@/app/lib/uiConfig";
import MyStaffingRosterTable from "./MyStaffingRosterTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { StaffingRequestCreate } from "../../common/staffing-requests/StaffingRequestTypes";
import WeekPicker from "../../common/staffing-requests/WeekPicker";

import ApiSelectDropdown from "@/app/components/ApiSelectDropdown";
import StaticSelectDropdown from "@/app/components/StaticSelectorDropDown";

interface Props {
  onSubmit: (data: StaffingRequestCreate) => void;
}

export default function StaffingRequestForm({ onSubmit }: Props) {
  const methods = useForm<StaffingRequestCreate>({
    defaultValues: {
      locationId: undefined,
      requestType: "REGULAR",
      reason: "",
      days: [],
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const days = watch("days");

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className={uiTheme.layout.formGrid}>
          {/* Location */}
          <ApiSelectDropdown
            label="Location"
            name="locationId"
            apiUrl="/locations/"
            optionKey="locationName"
            required={true}
          />

          {/* Request Type */}
          <StaticSelectDropdown
            label="Request Type"
            name="requestType"
            staticOptions={["REGULAR", "EMERGENCY"]}
          />
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

        {/* Submit */}
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
