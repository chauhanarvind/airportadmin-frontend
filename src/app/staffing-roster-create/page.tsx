"use client";

import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import StaffingRequestForm from "./StaffingRequestForm";
import StaffingRosterTable from "./StaffingRosterTable";
import {
  CleanedStaffingItem,
  StaffingRequestFormData,
  StaffingRequestPayload,
} from "./StaffingTypes";
import { cleanStaffingRequestData } from "./CleaningStaffingRequestData";
import { toast } from "sonner";
import { useRequireRoles } from "../lib/useRequireRoles";
import { handleCreate } from "../lib/crudService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const defaultDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function StaffingRosterPage() {
  const methods = useForm<StaffingRequestFormData>({
    defaultValues: {
      locationId: null,
      requestType: "REGULAR",
      reason: "",
      weekStart: undefined,
      items: defaultDays.map((day) => ({
        day,
        jobRoleId: null,
        jobLevelId: null,
        requiredCount: 0,
        startTime: "",
        endTime: "",
      })),
    },
  });

  const { control, handleSubmit, getValues, formState } = methods;
  const { isSubmitting } = formState;

  const fieldArray = useFieldArray({
    control,
    name: "items",
  });

  const { user } = useRequireRoles(["Admin", "Supervisor", "Manager"]);

  const onSubmit = async () => {
    const formData = getValues(); // ensure latest values
    const groupedDays = groupItemsByDate(formData);

    const payload: StaffingRequestPayload = {
      managerId: user?.id || null,
      locationId: formData.locationId!,
      requestType: formData.requestType!,
      reason: formData.reason,
      days: groupedDays,
    };

    const cleaned = cleanStaffingRequestData(payload);

    if (cleaned.days.length === 0) {
      toast.error("At least one valid staffing item is required.");
      return;
    }

    console.log(cleaned);

    handleCreate("/api/staffing-requests/submit", cleaned, "Staffing Request");
  };

  const groupItemsByDate = (formData: StaffingRequestFormData) => {
    const start = new Date(formData.weekStart ?? "");
    const dayMap = new Map<string, CleanedStaffingItem[]>();

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const iso = date.toISOString().split("T")[0];
      const dayName = defaultDays[i];

      const itemsForDay = formData.items.filter((item) => item.day === dayName);
      const cleanedItems = itemsForDay.map(({ day, ...rest }) => rest);

      dayMap.set(iso, cleanedItems);
    }

    return Array.from(dayMap.entries()).map(([date, items]) => ({
      date,
      items,
    }));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-6xl mx-auto p-6"
      >
        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-6 pt-6">
            <StaffingRequestForm />
            <StaffingRosterTable
              fields={fieldArray.fields}
              append={fieldArray.append}
              remove={fieldArray.remove}
            />
            <div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Weekly Staffing Request"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
