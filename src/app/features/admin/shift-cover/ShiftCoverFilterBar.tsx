"use client";

import { useFormContext } from "react-hook-form";
import TextInput from "@/app/components/form/TextInput";
import StaticSelectDropdown from "@/app/components/StaticSelectorDropDown";

export default function ShiftCoverFilterBar() {
  useFormContext(); // ensure context is active

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <TextInput
        name="originalUserId"
        label="Original User ID"
        placeholder="Enter original user ID"
      />
      <TextInput
        name="coveringUserId"
        label="Covering User ID"
        placeholder="Enter covering user ID"
      />
      <StaticSelectDropdown
        name="status"
        label="Status"
        required={false}
        staticOptions={[
          "ALL",
          "PENDING",
          "APPROVED",
          "REJECTED",
          "CANCELLED",
          "RESUBMITTED",
        ]}
      />
    </div>
  );
}
