"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import RoleSelector from "@/app/components/RoleSelector";
import { CreateUser, UpdateUser } from "@/app/dashboard/users/UserTypes";
import { uiTheme } from "@/app/lib/uiConfig";

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
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      email: initialData.email || "",
      roleId: initialData.roleId ?? undefined,
      jobLevelId: initialData.jobLevelId ?? undefined,
      jobRoleId: initialData.jobRoleId ?? undefined,
      constraintProfileId: initialData.constraintProfileId ?? undefined,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
    watch,
  } = methods;

  useEffect(() => {
    console.log(initialData);
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
            <div className="space-y-2">
              <Label htmlFor="firstName" className={uiTheme.text.label}>
                First Name
              </Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className={uiTheme.text.label}>
                Last Name
              </Label>
              <Input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={uiTheme.text.label}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Role & Job Info */}
          <div className={uiTheme.layout.formGrid}>
            <div className="space-y-2">
              <RoleSelector
                label="User Role"
                apiUrl="/api/roles/"
                name="roleId"
                optionKey="name"
                required
              />
            </div>

            <div className="space-y-2">
              <RoleSelector
                label="Job Role"
                apiUrl="/api/job-roles/"
                name="jobRoleId"
                optionKey="roleName"
                required
              />
            </div>

            <div className="space-y-2">
              <RoleSelector
                label="Job Level"
                apiUrl="/api/job-levels/"
                name="jobLevelId"
                optionKey="levelName"
                required
              />
            </div>

            <div className="space-y-2">
              <RoleSelector
                label="Constraint Profiles"
                apiUrl="/api/constraint-profiles/"
                name="constraintProfileId"
                optionKey="name"
                required={false}
              />
            </div>
          </div>

          {/* Password (Only for Create) */}
          {!isEditMode && (
            <div className="space-y-2">
              <Label htmlFor="password" className={uiTheme.text.label}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full"
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
