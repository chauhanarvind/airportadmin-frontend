"use client";

import { useFormContext } from "react-hook-form";
import TextInput from "@/app/components/form/TextInput";
import StaticSelectDropdown from "@/app/components/StaticSelectorDropDown";

export default function StaffingRequestFilterBar() {
  useFormContext(); // ensure it's within <FormProvider>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <TextInput
        name="managerId"
        label="Manager ID"
        placeholder="Enter Manager ID"
      />
      <TextInput
        name="locationId"
        label="Location ID"
        placeholder="Enter Location ID"
      />
      <StaticSelectDropdown
        name="status"
        label="Status"
        staticOptions={["ALL", "PENDING", "APPROVED", "REJECTED"]}
        required={false}
      />
    </div>
  );
}
