"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { uiTheme } from "@/app/lib/uiConfig";
import { toast } from "sonner";
import { StaffAvailabilityRequest } from "../common/staff-availability/StaffAvailabilityTypes";

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
      userId: defaultValues?.userId ?? 0,
      date: defaultValues?.date ?? "",
      isAvailable: defaultValues?.isAvailable ?? true,
      unavailableFrom: defaultValues?.unavailableFrom ?? "",
      unavailableTo: defaultValues?.unavailableTo ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
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

      if (data.unavailableFrom && data.unavailableTo) {
        if (data.unavailableFrom === data.unavailableTo) {
          toast.error("Unavailable From and To cannot be the same time.");
          return false;
        }
      }
    } else {
      // User is unavailable for the whole day — clear any partial time
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
        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date" className={uiTheme.text.label}>
            Date
          </Label>
          <Input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

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
            <div className="space-y-2">
              <Label htmlFor="unavailableFrom" className={uiTheme.text.label}>
                Unavailable From
              </Label>
              <Input
                type="time"
                id="unavailableFrom"
                {...register("unavailableFrom")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unavailableTo" className={uiTheme.text.label}>
                Unavailable To
              </Label>
              <Input
                type="time"
                id="unavailableTo"
                {...register("unavailableTo")}
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          className={uiTheme.colors.primary}
          disabled={isSubmitting}
        >
          Submit Availability
        </Button>
      </form>
    </FormProvider>
  );
}
