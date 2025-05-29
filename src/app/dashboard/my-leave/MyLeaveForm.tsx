"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";

import TextInput from "@/app/components/form/TextInput";
import DateInput from "@/app/components/form/DateInput";
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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className={uiTheme.layout.formGrid}>
          <DateInput name="startDate" label="Start Date" required />
          <DateInput name="endDate" label="End Date" required />
        </div>

        <TextInput name="reason" label="Reason" required />

        <Button
          type="submit"
          className={uiTheme.buttons.submit}
          disabled={isSubmitting}
        >
          {mode === "resubmit" ? "Resubmit Leave" : "Apply for Leave"}
        </Button>
      </form>
    </FormProvider>
  );
}
