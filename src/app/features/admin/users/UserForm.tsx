"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

import TextInput from "@/app/components/form/TextInput";
import { uiTheme } from "@/app/lib/uiConfig";
import { CreateUser, UpdateUser } from "./UserTypes";
import ApiSelectDropdown from "@/app/components/ApiSelectDropdown";

type UserFormData = Partial<UpdateUser> & CreateUser;

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

export default function UserForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: UserFormProps) {
  const methods = useForm<UserFormData>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      ...initialData,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
    watch,
  } = methods;

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: UserFormData) => {
    if (!isEditMode && !watch("password")) {
      toast.error("Please set a password");
      return;
    }

    onSubmit({ ...data, id: initialData.id });
  };

  return (
    <div className={uiTheme.layout.container}>
      <FormProvider {...methods}>
        <form className="space-y-8" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Personal Info */}
          <div className={uiTheme.layout.formGrid}>
            <TextInput name="firstName" label="First Name" required />
            <TextInput name="lastName" label="Last Name" required />
            <TextInput name="email" label="Email" type="email" required />
          </div>

          {/* Role & Job Info */}
          <div className={uiTheme.layout.formGrid}>
            <ApiSelectDropdown
              label="User Role"
              name="roleId"
              apiUrl="/roles/"
              optionKey="name"
              required
            />
            <ApiSelectDropdown
              label="Job Role"
              name="jobRoleId"
              apiUrl="/job-roles/"
              optionKey="roleName"
              required
            />
            <ApiSelectDropdown
              label="Job Level"
              name="jobLevelId"
              apiUrl="/job-levels/"
              optionKey="levelName"
              required
            />
            <ApiSelectDropdown
              label="Constraint Profile"
              name="constraintProfileId"
              apiUrl="/constraint-profiles/"
              optionKey="name"
              required={false}
            />
          </div>

          {/* Password Field */}
          {!isEditMode && (
            <TextInput
              name="password"
              label="Password"
              type="password"
              required
            />
          )}

          {/* Submit */}
          <div className={uiTheme.layout.formGrid}>
            <Button
              type="submit"
              className={uiTheme.buttons.submit}
              disabled={isEditMode && !isDirty}
            >
              {submitText || (isEditMode ? "Update User" : "Create User")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
