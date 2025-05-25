import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import RoleSelector from "../components/RoleSelector";

export type UserFormData = {
  id?: number; //used only for edit
  firstName: string;
  lastName: string;
  email: string;
  roleId: number | null;
  jobLevelId: number | null;
  jobRoleId: number | null;
  password?: string; // only used for create
};

interface UserFormProps {
  initialData?: Partial<Omit<UserFormData, "password">>; //data passed when in edit mode
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
      roleId: initialData.roleId || null,
      jobLevelId: initialData.jobLevelId || null,
      jobRoleId: initialData.jobRoleId || null,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
    watch,
  } = methods;

  const handleFormSubmit = async (data: UserFormData) => {
    if (!isEditMode && !watch("password")) {
      toast.error("Please set a password");
      return;
    }

    onSubmit({ ...data, id: initialData.id });
  };

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      reset({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        roleId: initialData.roleId || null,
        jobLevelId: initialData.jobLevelId || null,
        jobRoleId: initialData.jobRoleId || null,
      });
    }
  }, [initialData, reset]);

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow space-y-6 ">
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* First Name  */}
          <div className="space-y-1">
            <Label htmlFor="name">First Name</Label>
            <Input
              id="name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email  */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Role Drop Down */}
          <RoleSelector
            label="User Role"
            apiUrl="/api/roles/"
            name="roleId"
            optionKey="name"
            required={true}
          />

          {/* Job Role Drop Down  */}
          <RoleSelector
            label="Job Role"
            apiUrl="/api/job-roles/"
            name="jobRoleId"
            optionKey="roleName"
            required={true}
          />

          {/* Job level drop down */}
          <RoleSelector
            label="Job Level"
            apiUrl="/api/job-levels/"
            name="jobLevelId"
            optionKey="levelName"
            required={true}
          />

          {/* password */}
          {!isEditMode && (
            <div className="space-y-1">
              <Label htmlFor="password">Set Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required for new users",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button  */}
          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isEditMode && !isDirty}
            >
              {submitText}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
