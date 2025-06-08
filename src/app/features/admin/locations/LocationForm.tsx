"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import TextInput from "@/app/components/form/TextInput";
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
    formState: { isDirty },
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
          <TextInput name="locationName" label="Location Name" required />

          <div className="space-y-2 w-full">
            <label htmlFor="description" className={uiTheme.text.label}>
              Description
            </label>
            <Textarea
              id="description"
              className="w-full"
              rows={3}
              {...register("description")}
            />
          </div>
        </div>

        <div className={uiTheme.layout.formGrid}>
          <Button
            type="submit"
            className={uiTheme.buttons.submit}
            disabled={isEditMode && !isDirty}
          >
            {submitText || (isEditMode ? "Update Location" : "Create Location")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
