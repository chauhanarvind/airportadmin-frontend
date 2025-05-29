"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { uiTheme } from "@/app/lib/uiConfig";
import TextInput from "@/app/components/form/TextInput";
import { CreateJobCategory, UpdateJobCategory } from "./JobCategoryTypes";

type JobCategoryFormData = Partial<UpdateJobCategory> & CreateJobCategory;

interface JobCategoryFormProps {
  initialData?: Partial<JobCategoryFormData>;
  onSubmit: (data: JobCategoryFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

export default function JobCategoryForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: JobCategoryFormProps) {
  const methods = useForm<JobCategoryFormData>({
    mode: "onChange",
    defaultValues: {
      categoryName: initialData.categoryName || "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: JobCategoryFormData) => {
    if (!data.categoryName) {
      toast.error("Category name is required");
      return;
    }

    onSubmit({ ...data, id: initialData.id });
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={uiTheme.layout.formGrid}>
          <TextInput name="categoryName" label="Category Name" required />
        </div>

        <div>
          <Button
            type="submit"
            className={`w-full ${uiTheme.buttons.submit}`}
            disabled={isEditMode && !isDirty}
          >
            {submitText || (isEditMode ? "Update Category" : "Create Category")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
