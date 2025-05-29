import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

export default function TextInput({
  name,
  label,
  type = "text",
  required = false,
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
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
