"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import TextInput from "@/app/components/form/TextInput";
import { uiTheme } from "@/app/lib/uiConfig";

import { CreateJobRole, UpdateJobRole } from "./JobRoleTypes";
import ApiSelectDropdown from "@/app/components/ApiSelectDropdown";

type JobRoleFormData = Partial<UpdateJobRole> & CreateJobRole;

interface JobRoleFormProps {
  initialData?: Partial<JobRoleFormData>;
  onSubmit: (data: JobRoleFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

export default function JobRoleForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: JobRoleFormProps) {
  const methods = useForm<JobRoleFormData>({
    mode: "onChange",
    defaultValues: {
      roleName: initialData.roleName || "",
      categoryId: initialData.categoryId ?? undefined,
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

  const handleFormSubmit = (data: JobRoleFormData) => {
    if (!data.categoryId) {
      toast.error("Please select a category");
      return;
    }

    onSubmit({ ...data, id: initialData.id });
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={uiTheme.layout.formGrid}>
          <TextInput name="roleName" label="Job Role Name" required />
          <ApiSelectDropdown
            name="categoryId"
            label="Job Category"
            apiUrl="/job-categories/"
            optionKey="categoryName"
            required
          />
        </div>

        <div className={uiTheme.layout.formGrid}>
          <Button
            type="submit"
            className={uiTheme.buttons.submit}
            disabled={isEditMode && !isDirty}
          >
            {submitText || (isEditMode ? "Update Job Role" : "Create Job Role")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
