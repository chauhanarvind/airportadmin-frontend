"use client";

import { useFormContext } from "react-hook-form";
import TextInput from "@/app/components/form/TextInput";
import StaticSelectDropdown from "@/app/components/StaticSelectorDropDown";

export default function FilterBar() {
  useFormContext(); // ensures the component is inside a form context

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <TextInput
        name="userId"
        label="Filter by User ID"
        placeholder="Enter user ID"
      />

      <StaticSelectDropdown
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
