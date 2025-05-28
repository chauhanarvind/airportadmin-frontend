"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { uiTheme } from "@/app/lib/uiConfig";
import { CreateJobLevel, UpdateJobLevel } from "./JobLevelTypes";

type JobLevelFormData = Partial<UpdateJobLevel> & CreateJobLevel;

interface JobLevelFormProps {
  initialData?: Partial<JobLevelFormData>;
  onSubmit: (data: JobLevelFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

export default function JobLevelForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: JobLevelFormProps) {
  const methods = useForm<JobLevelFormData>({
    mode: "onChange",
    defaultValues: {
      levelName: initialData.levelName || "",
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

  const handleFormSubmit = (data: JobLevelFormData) => {
    if (!data.levelName) {
      toast.error("Level name is required");
      return;
    }

    onSubmit({ ...data, id: initialData.id });
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={uiTheme.layout.formGrid}>
          <div className="space-y-2 w-full">
            <Label htmlFor="levelName" className={uiTheme.text.label}>
              Level Name
            </Label>
            <Input
              id="levelName"
              className="w-full"
              {...register("levelName", {
                required: "Level name is required",
              })}
            />
            {errors.levelName && (
              <p className="text-red-500 text-sm">{errors.levelName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isEditMode && !isDirty}
          >
            {submitText || (isEditMode ? "Update Level" : "Create Level")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
