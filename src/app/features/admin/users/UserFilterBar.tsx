"use client";

import { useFormContext } from "react-hook-form";
import TextInput from "@/app/components/form/TextInput";

export default function UserFilterBar() {
  useFormContext(); // Must be inside a <FormProvider>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <TextInput name="userId" label="User ID" placeholder="Filter by ID" />
      <TextInput name="name" label="Name" placeholder="Filter by Name" />
      <TextInput name="email" label="Email" placeholder="Filter by Email" />
    </div>
  );
}
