import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

export type levelFormData = {
  id?: number; //wont be needing during create, only for edit
  levelName: string;
};

interface LevelFormProps {
  initialData?: Partial<levelFormData>;
  onSubmit: (data: levelFormData) => void;
  isEditMode?: boolean;
  submitText?: string;
}

export default function LevelForm({
  initialData = {},
  onSubmit,
  isEditMode = false,
  submitText = "Submit",
}: LevelFormProps) {
  const methods = useForm<levelFormData>({
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

  const handleFormSubmit = async (data: levelFormData) => {
    onSubmit({ ...data, id: initialData.id });
  };

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      reset({
        levelName: initialData.levelName || "",
      });
    }
  }, [initialData, reset]);

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow space-y-6 ">
      <FormProvider {...methods}>
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* First Name  */}
          <div className="space-y-1">
            <Label htmlFor="levelName">Job Level Name</Label>
            <Input
              id="levelName"
              {...register("levelName", {
                required: "Job level name is required",
              })}
            />
            {errors.levelName && (
              <p className="text-red-500 text-sm">{errors.levelName.message}</p>
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
