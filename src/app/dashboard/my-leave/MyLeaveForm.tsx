"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { LeaveRequestCreate } from "@/app/dashboard/common/leave/LeaveTypes";
import { uiTheme } from "@/app/lib/uiConfig";

interface Props {
  mode: "apply" | "resubmit";
  defaultValues?: Partial<LeaveRequestCreate>;
  onSubmit: (data: LeaveRequestCreate) => void;
}

export function MyLeaveForm({ mode, defaultValues, onSubmit }: Props) {
  const methods = useForm<LeaveRequestCreate>({
    defaultValues: {
      startDate: "",
      endDate: "",
      reason: "",
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className={uiTheme.layout.formGrid}>
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate" className={uiTheme.text.label}>
              Start Date
            </Label>
            <Input
              type="date"
              id="startDate"
              {...register("startDate", { required: "Start date is required" })}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="endDate" className={uiTheme.text.label}>
              End Date
            </Label>
            <Input
              type="date"
              id="endDate"
              {...register("endDate", { required: "End date is required" })}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <Label htmlFor="reason" className={uiTheme.text.label}>
            Reason
          </Label>
          <Input
            id="reason"
            {...register("reason", { required: "Reason is required" })}
          />
          {errors.reason && (
            <p className="text-red-500 text-sm">{errors.reason.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className={uiTheme.colors.primary}
          disabled={isSubmitting}
        >
          {mode === "resubmit" ? "Resubmit Leave" : "Apply for Leave"}
        </Button>
      </form>
    </FormProvider>
  );
}
