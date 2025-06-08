"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import DateInput from "@/app/components/form/DateInput";
import TextInput from "@/app/components/form/TextInput";
import { uiTheme } from "@/app/lib/uiConfig";
import { StaffAvailabilityRequest } from "../../common/staff-availability/StaffAvailabilityTypes";

interface Props {
  onSubmit: (data: StaffAvailabilityRequest) => void;
  defaultValues?: Partial<StaffAvailabilityRequest>;
}

export default function MyStaffAvailabilityForm({
  onSubmit,
  defaultValues,
}: Props) {
  const methods = useForm<StaffAvailabilityRequest>({
    defaultValues: {
      date: defaultValues?.date ?? "",
      isAvailable: defaultValues?.isAvailable ?? true,
      unavailableFrom: defaultValues?.unavailableFrom ?? "",
      unavailableTo: defaultValues?.unavailableTo ?? "",
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, isDirty },
  } = methods;

  const isAvailable = watch("isAvailable");

  const validateForm = (data: StaffAvailabilityRequest) => {
    if (data.isAvailable) {
      const hasFrom = !!data.unavailableFrom;
      const hasTo = !!data.unavailableTo;

      if ((hasFrom && !hasTo) || (!hasFrom && hasTo)) {
        toast.error(
          "Please provide both 'Unavailable From' and 'Unavailable To' times."
        );
        return false;
      }

      if (hasFrom && hasTo && data.unavailableFrom === data.unavailableTo) {
        toast.error("Unavailable From and To cannot be the same time.");
        return false;
      }
    } else {
      data.unavailableFrom = undefined;
      data.unavailableTo = undefined;
    }

    return true;
  };

  const handleFormSubmit = (data: StaffAvailabilityRequest) => {
    if (!validateForm(data)) return;
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <DateInput name="date" label="Date" required />

        {/* Availability Toggle */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isAvailable"
            checked={!isAvailable}
            onCheckedChange={(val) => setValue("isAvailable", !val)}
          />
          <Label htmlFor="isAvailable">
            I am <strong>not available</strong> on this date
          </Label>
        </div>

        {/* Time Range (if partially unavailable) */}
        {isAvailable && (
          <div className={uiTheme.layout.formGrid}>
            <TextInput
              name="unavailableFrom"
              label="Unavailable From"
              type="time"
              required={false}
            />
            <TextInput
              name="unavailableTo"
              label="Unavailable To"
              type="time"
              required={false}
            />
          </div>
        )}

        <Button
          type="submit"
          className={uiTheme.buttons.submit}
          disabled={isSubmitting || !isDirty}
        >
          Submit Availability
        </Button>
      </form>
    </FormProvider>
  );
}
