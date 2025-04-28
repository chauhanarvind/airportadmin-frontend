import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

export type RoleFormData = {
  id?: number; //wont be needing during create, only for edit
  name: string;
  categoryId: number | null;
};

interface RoleFormProps {
  initialData?: Partial<RoleFormData>;
  onSubmit: (data: RoleFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

export default function RoleForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: RoleFormProps) {
  const methods = useForm<RoleFormData>({
    mode: "onChange",
    defaultValues: {
      name: initialData.name || "",
      categoryId: initialData.categoryId || null,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = methods;

  const handleFormSubmit = async (data: RoleFormData) => {
    onSubmit({ ...data, id: initialData.id });
  };

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      reset({
        name: initialData.name || "",
        categoryId: initialData.categoryId || null,
      });
    }
  }, [initialData, reset]);

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow space-y-6 ">
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* First Name  */}
          <div className="space-y-1">
            <Label htmlFor="name">Job Role Name</Label>
            <Input
              id="name"
              {...register("name", {
                required: "Job role name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
