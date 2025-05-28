"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import RoleSelector from "@/app/components/RoleSelector";
import { LeaveRequestResponse } from "@/app/dashboard/common/leave/LeaveTypes";
import { uiTheme } from "@/app/lib/uiConfig";

interface Props {
  onSubmit: (data: LeaveRequestResponse) => void;
}

export default function LeaveForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,

    formState: { isSubmitting },
  } = useFormContext<LeaveRequestResponse>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Dates */}
      <div className={uiTheme.layout.formGrid}>
        <div className="space-y-2">
          <Label htmlFor="startDate" className={uiTheme.text.label}>
            Start Date
          </Label>
          <Input
            id="startDate"
            type="date"
            disabled
            {...register("startDate")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate" className={uiTheme.text.label}>
            End Date
          </Label>
          <Input id="endDate" type="date" disabled {...register("endDate")} />
        </div>
      </div>

      {/* Reason */}
      <div className="space-y-2">
        <Label htmlFor="reason" className={uiTheme.text.label}>
          Reason
        </Label>
        <Input id="reason" disabled {...register("reason")} />
      </div>

      {/* Status Dropdown using RoleSelector */}
      <RoleSelector
        label="Update Status"
        name="status"
        required={true}
        staticOptions={["APPROVED", "REJECTED", "PENDING"]}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        className={uiTheme.colors.primary}
        disabled={isSubmitting}
      >
        Update Status
      </Button>
    </form>
  );
}
