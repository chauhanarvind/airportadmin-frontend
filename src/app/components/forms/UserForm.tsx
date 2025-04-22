import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoleSelector from "./RoleSelector";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<UserFormData>({
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
          optionKey="name"
          onChange={(value) => setValue("roleId", parseInt(value))}
          value={watch("roleId")?.toString() ?? ""}
        />

        {/* Job Role Drop Down  */}
        <RoleSelector
          label="Job Role"
          apiUrl="/api/job-roles/"
          optionKey="roleName"
          onChange={(value) => setValue("jobRoleId", parseInt(value))}
          value={watch("jobRoleId")?.toString() ?? ""}
        />

        {/* Job level drop down */}
        <RoleSelector
          label="Job Level"
          apiUrl="/api/job-levels/"
          optionKey="levelName"
          onChange={(value) => setValue("jobLevelId", parseInt(value))}
          value={watch("jobLevelId")?.toString() ?? ""}
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
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        )}

        {/* Submit Button  */}
        <div>
          <Button
            type="submit"
            className="w-full"
            disabled={(isEditMode && !isDirty) || !isValid}
          >
            {submitText}
          </Button>
        </div>
      </form>
    </div>
  );
}
