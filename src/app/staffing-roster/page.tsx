"use client";

import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import StaffingRequestForm from "./StaffingRequestForm";
import StaffingRosterTable from "./StaffingRosterTable";

export type StaffingItem = {
  day: string;
  jobRoleId: number | null;
  jobLevelId: number | null;
  requiredCount: number;
  startTime: string;
  endTime: string;
};

export type StaffingRequestFormData = {
  locationId: number | null;
  requestType: string | null;
  reason: string;
  weekStart?: string;
  items: StaffingItem[];
};

export default function StaffingRosterPage() {
  const methods = useForm<StaffingRequestFormData>({
    defaultValues: {
      locationId: null,
      requestType: null,
      reason: "",
      weekStart: undefined,
      items: [],
    },
  });

  const { control, handleSubmit } = methods;

  const fieldArray = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: StaffingRequestFormData) => {
    console.log("Complete staffing request submitted:", data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-6xl mx-auto p-6"
      >
        <StaffingRequestForm replace={fieldArray.replace} />
        <StaffingRosterTable
          fields={fieldArray.fields}
          append={fieldArray.append}
          remove={fieldArray.remove}
        />
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit Weekly Staffing Request
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
