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
      requestType: "Regular",
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

  const { control, handleSubmit } = methods;

  const fieldArray = useFieldArray({
    control,
    name: "items",
  });

  const { user } = useRequireRoles(["Admin", "Supervisor", "Manager"]);

  const onSubmit = (formData: StaffingRequestFormData) => {
    const groupedDays = groupItemsByDate(formData);
    const payload: StaffingRequestPayload = {
      managerId: user?.id || null, // Replace with auth context if needed
      locationId: formData.locationId!,
      requestType: formData.requestType!,
      reason: formData.reason,
      status: "Pending",
      days: groupedDays,
    };

    const cleaned = cleanStaffingRequestData(payload);

    console.log(cleaned);
    if (cleaned.days.length === 0) {
      toast.error("At least one valid staffing item is required.");
      return;
    }
    console.log("Cleaned Payload:", cleaned);

    handleCreateStaffingRequest(cleaned);
  };

  const handleCreateStaffingRequest = async (data: StaffingRequestPayload) => {
    handleCreate("/api/staffing-requests/submit", data, "Staffing Request");
  };

  const groupItemsByDate = (formData: StaffingRequestFormData) => {
    const start = new Date(formData.weekStart ?? "");
    const dayMap = new Map<string, CleanedStaffingItem[]>(); // ← update this

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const iso = date.toISOString().split("T")[0];
      const dayName = defaultDays[i];

      const itemsForDay = formData.items.filter((item) => item.day === dayName);
      const cleanedItems = itemsForDay.map(({ day, ...rest }) => rest); // day removed

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
        <StaffingRequestForm />
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
