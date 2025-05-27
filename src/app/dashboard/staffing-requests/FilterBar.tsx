"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RoleSelector from "../components/RoleSelector";

type FilterFormValues = {
  managerId: number | null;
  locationId: number | null;
  status: string;
};

type FilterBarProps = {
  onFilter: (filters: Partial<FilterFormValues>) => void;
};

export default function FilterBar({ onFilter }: FilterBarProps) {
  const methods = useForm<FilterFormValues>({
    defaultValues: {
      managerId: null,
      locationId: null,
      status: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (values: FilterFormValues) => {
    // Remove empty filters
    const cleaned: Partial<FilterFormValues> = {
      ...values,
      managerId: isNaN(values.managerId as number) ? null : values.managerId,
      locationId: isNaN(values.locationId as number) ? null : values.locationId,
    };
    console.log(cleaned);
    const filters = Object.fromEntries(
      Object.entries(cleaned).filter(([_, v]) => v !== "" && v != null)
    );

    onFilter(filters);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap gap-4 items-end"
      >
        <Input
          {...methods.register("managerId", {
            valueAsNumber: true,
          })}
          placeholder="Manager Id"
          className="w-[200px]"
        />

        <RoleSelector
          label="Location"
          apiUrl="/api/locations/"
          name="locationId"
          optionKey="locationName"
          required={false}
        />

        <RoleSelector
          label="Status"
          name="status"
          staticOptions={[
            "PENDING",
            "APPROVED",
            "REJECTED",
            "RESUBMITTED",
            "CANCELLED",
          ]}
          required={false}
        />

        <Button type="submit">Search</Button>
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </form>
    </FormProvider>
  );
}
