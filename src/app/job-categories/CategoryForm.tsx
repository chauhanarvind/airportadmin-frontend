import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

export type CategoryFormData = {
  id?: number; //wont be needing during create, only for edit
  categoryName: string;
};

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

export default function CategoryForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: CategoryFormProps) {
  const methods = useForm<CategoryFormData>({
    mode: "onChange",
    defaultValues: {
      categoryName: initialData.categoryName || "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = methods;

  const handleFormSubmit = async (data: CategoryFormData) => {
    onSubmit({ ...data, id: initialData.id });
  };

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      reset({
        categoryName: initialData.categoryName || "",
      });
    }
  }, [initialData, reset]);

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow space-y-6 ">
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* First Name  */}
          <div className="space-y-1">
            <Label htmlFor="categoryName">Job Category Name</Label>
            <Input
              id="categoryName"
              {...register("categoryName", {
                required: "Job category name is required",
              })}
            />
            {errors.categoryName && (
              <p className="text-red-500 text-sm">
                {errors.categoryName.message}
              </p>
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
