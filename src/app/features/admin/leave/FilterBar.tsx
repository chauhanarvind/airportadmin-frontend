"use client";

import { useFormContext } from "react-hook-form";

import TextInput from "@/app/components/form/TextInput";
import SelectInput from "@/app/components/form/SelectInput";

export default function FilterBar() {
  useFormContext(); // Just to ensure form context is active

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <TextInput
        name="userId"
        label="Filter by User ID"
        placeholder="Enter user ID"
      />

      <SelectInput
        name="status"
        label="Filter by Status"
        staticOptions={[
          "ALL",
          "PENDING",
          "APPROVED",
          "REJECTED",
          "CANCELLED",
          "RESUBMITTED",
        ]}
        required={false}
      />
    </div>
  );
}
