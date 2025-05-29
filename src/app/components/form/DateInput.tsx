import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface DateInputProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

export default function DateInput({
  name,
  label,
  required = false,
  disabled,
}: DateInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="date"
        disabled={disabled}
        {...register(
          name,
          required ? { required: `${label} is required` } : {}
        )}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">{(errors[name] as any).message}</p>
      )}
    </div>
  );
}
