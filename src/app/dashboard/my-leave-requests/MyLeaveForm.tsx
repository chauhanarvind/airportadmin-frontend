"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { uiTheme } from "@/app/lib/uiConfig";
import {
  LeaveRequestCreate,
  LeaveStatus,
} from "@/app/dashboard/common/leave/LeaveTypes";
import { useEffect } from "react";

interface Props {
  mode: "apply" | "resubmit" | "cancel";
  initialData?: LeaveRequestCreate;
  onSubmit: (data: LeaveRequestCreate) => void;
  onCancel?: () => void;
  disabled?: boolean;
  currentStatus?: LeaveStatus;
}

export default function MyLeaveForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  disabled = false,
  currentStatus,
}: Props) {
  const methods = useForm<LeaveRequestCreate>({
    defaultValues: {
      startDate: "",
      endDate: "",
      reason: "",
      userId: initialData?.userId ?? 0, // should come from auth
      ...initialData,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    console.log(mode);
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Form Fields */}
        <div className={uiTheme.layout.formGrid}>
          <div className="space-y-2">
            <Label htmlFor="startDate" className={uiTheme.text.label}>
              Start Date
            </Label>
            <Input
              type="date"
              id="startDate"
              disabled={disabled}
              {...register("startDate", { required: "Start date is required" })}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate" className={uiTheme.text.label}>
              End Date
            </Label>
            <Input
              type="date"
              id="endDate"
              disabled={disabled}
              {...register("endDate", { required: "End date is required" })}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="reason" className={uiTheme.text.label}>
              Reason
            </Label>
            <Input
              id="reason"
              disabled={disabled}
              {...register("reason", { required: "Reason is required" })}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap">
          {(mode === "apply" || mode === "resubmit") && (
            <Button type="submit" className="w-full sm:w-auto">
              {mode === "apply" ? "Submit Leave Request" : "Resubmit Request"}
            </Button>
          )}

          {mode === "cancel" && onCancel && currentStatus === "PENDING" && (
            <Button
              type="button"
              variant="destructive"
              onClick={onCancel}
              className="w-full sm:w-auto"
            >
              Cancel Request
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
