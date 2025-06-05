"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { LeaveRequestResponse } from "@/app/features/common/leave/LeaveTypes";
import { uiTheme } from "@/app/lib/uiConfig";

import TextInput from "@/app/components/form/TextInput";
import DateInput from "@/app/components/form/DateInput";
import StaticSelectDropdown from "@/app/components/StaticSelectorDropDown";

interface Props {
  onSubmit: (data: LeaveRequestResponse) => void;
}

export default function LeaveForm({ onSubmit }: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<LeaveRequestResponse>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Dates */}
      <div className={uiTheme.layout.formGrid}>
        <DateInput name="startDate" label="Start Date" disabled />
        <DateInput name="endDate" label="End Date" disabled />
      </div>

      {/* Reason */}
      <TextInput name="reason" label="Reason" disabled />

      {/* Status Dropdown */}
      <StaticSelectDropdown
        name="status"
        label="Update Status"
        required
        staticOptions={[
          "PENDING",
          "APPROVED",
          "REJECTED",
          "CANCELLED",
          "RESUBMITTED",
        ]}
      />

      <Button
        type="submit"
        className={uiTheme.buttons.submit}
        disabled={isSubmitting}
      >
        Update Status
      </Button>
    </form>
  );
}
