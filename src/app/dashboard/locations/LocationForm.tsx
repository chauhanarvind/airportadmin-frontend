"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { uiTheme } from "@/app/lib/uiConfig";
import { CreateLocation, UpdateLocation } from "./LocationTypes";

type LocationFormData = Partial<UpdateLocation> & CreateLocation;

interface LocationFormProps {
  initialData?: Partial<LocationFormData>;
  onSubmit: (data: LocationFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

export default function LocationForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: LocationFormProps) {
  const methods = useForm<LocationFormData>({
    mode: "onChange",
    defaultValues: {
      locationName: initialData.locationName || "",
      description: initialData.description || "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = methods;

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: LocationFormData) => {
    if (!data.locationName) {
      toast.error("Location name is required");
      return;
    }

    onSubmit({ ...data, id: initialData.id });
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={uiTheme.layout.formGrid}>
          <div className="space-y-2 w-full">
            <Label htmlFor="locationName" className={uiTheme.text.label}>
              Location Name
            </Label>
            <Input
              id="locationName"
              className="w-full"
              {...register("locationName", {
                required: "Location name is required",
              })}
            />
            {errors.locationName && (
              <p className="text-red-500 text-sm">
                {errors.locationName.message}
              </p>
            )}
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="description" className={uiTheme.text.label}>
              Description
            </Label>
            <Textarea
              id="description"
              className="w-full"
              rows={3}
              {...register("description")}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isEditMode && !isDirty}
          >
            {submitText || (isEditMode ? "Update Location" : "Create Location")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
