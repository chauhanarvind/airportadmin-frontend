"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { uiTheme } from "@/app/lib/uiConfig";
import RoleSelector from "@/app/components/RoleSelector";
import { CreateJobRole, UpdateJobRole, JobRoleResponse } from "./JobRoleTypes";

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
          <div className="space-y-2">
            <Label htmlFor="roleName" className={uiTheme.text.label}>
              Job Role Name
            </Label>
            <Input
              id="roleName"
              {...register("roleName", { required: "Role name is required" })}
            />
            {errors.roleName && (
              <p className="text-red-500 text-sm">{errors.roleName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <RoleSelector
              label="Job Category"
              apiUrl="/api/job-categories/"
              name="categoryId"
              optionKey="categoryName"
              required
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={isEditMode && !isDirty}
          >
            {submitText || (isEditMode ? "Update Job Role" : "Create Job Role")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
