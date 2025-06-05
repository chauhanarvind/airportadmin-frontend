"use client";

import { useFormContext } from "react-hook-form";
import TextInput from "@/app/components/form/TextInput";
import DateInput from "@/app/components/form/DateInput";

export default function StaffAvailabilityFilterBar() {
  useFormContext(); // ensures form context is active

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <TextInput
        name="userId"
        label="Filter by User ID"
        placeholder="Enter user ID"
      />
      <DateInput name="date" label="Filter by Date" placeholder="Select date" />
    </div>
  );
}
