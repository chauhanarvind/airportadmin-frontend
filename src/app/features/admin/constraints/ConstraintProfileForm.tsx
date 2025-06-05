"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { uiTheme } from "@/app/lib/uiConfig";
import {
  CreateConstraintProfile,
  UpdateConstraintProfile,
} from "./ConstraintProfileTypes";

type ConstraintProfileFormData = Partial<UpdateConstraintProfile> &
  CreateConstraintProfile;

interface ConstraintProfileFormProps {
  initialData?: Partial<ConstraintProfileFormData>;
  onSubmit: (data: ConstraintProfileFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

const allDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default function ConstraintProfileForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: ConstraintProfileFormProps) {
  const methods = useForm<ConstraintProfileFormData>({
    mode: "onChange",
    defaultValues: {
      name: initialData.name || "",
      maxHoursPerDay: initialData.maxHoursPerDay || undefined,
      maxHoursPerWeek: initialData.maxHoursPerWeek || undefined,
      preferredStartTime: initialData.preferredStartTime || "",
      preferredEndTime: initialData.preferredEndTime || "",
      allowedDays: initialData.allowedDays || [],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
    watch,
    setValue,
  } = methods;

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: ConstraintProfileFormData) => {
    if (!data.name) {
      toast.error("Name is required");
      return;
    }

    onSubmit({ ...data, id: initialData.id });
  };

  const toggleDay = (day: string) => {
    const current = watch("allowedDays") || [];
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    setValue("allowedDays", updated);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={uiTheme.layout.formGrid}>
          <div className="space-y-2 w-full">
            <Label htmlFor="name" className={uiTheme.text.label}>
              Name
            </Label>
            <Input
              id="name"
              className="w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="maxHoursPerDay" className={uiTheme.text.label}>
              Max Hours/Day
            </Label>
            <Input
              id="maxHoursPerDay"
              type="number"
              className="w-full"
              {...register("maxHoursPerDay")}
            />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="maxHoursPerWeek" className={uiTheme.text.label}>
              Max Hours/Week
            </Label>
            <Input
              id="maxHoursPerWeek"
              type="number"
              className="w-full"
              {...register("maxHoursPerWeek")}
            />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="preferredStartTime" className={uiTheme.text.label}>
              Preferred Start Time
            </Label>
            <Input
              id="preferredStartTime"
              type="time"
              className="w-full"
              {...register("preferredStartTime")}
            />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="preferredEndTime" className={uiTheme.text.label}>
              Preferred End Time
            </Label>
            <Input
              id="preferredEndTime"
              type="time"
              className="w-full"
              {...register("preferredEndTime")}
            />
          </div>
        </div>

        {/* Allowed Days */}
        <div className="space-y-2">
          <Label className={uiTheme.text.label}>Allowed Days</Label>
          <div className="flex flex-wrap gap-2">
            {allDays.map((day) => {
              const selected = watch("allowedDays")?.includes(day);
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition ${
                    selected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                  }`}
                >
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isEditMode && !isDirty}
          >
            {submitText || (isEditMode ? "Update Profile" : "Create Profile")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
