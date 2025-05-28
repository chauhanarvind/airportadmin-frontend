"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import RoleSelector from "@/app/components/RoleSelector";
import { uiTheme } from "@/app/lib/uiConfig";

export default function FilterBar() {
  const { register } = useFormContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* User ID Filter */}
      <div className="space-y-2">
        <Label htmlFor="userId" className={uiTheme.text.label}>
          Filter by User ID
        </Label>
        <Input
          id="userId"
          placeholder="Enter user ID"
          {...register("userId")}
        />
      </div>

      {/* Status Filter using RoleSelector */}
      <RoleSelector
        label="Filter by Status"
        name="status"
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
