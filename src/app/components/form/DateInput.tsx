import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface DateInputProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: string | null; // null disables the min restriction
}

export default function DateInput({
  name,
  label,
  required = false,
  disabled,
  placeholder,
  min,
}: DateInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Default to today unless min is explicitly null
  const today = new Date().toISOString().split("T")[0];
  const effectiveMin = min === undefined ? today : min ?? undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="date"
        placeholder={placeholder}
        disabled={disabled}
        min={effectiveMin}
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
