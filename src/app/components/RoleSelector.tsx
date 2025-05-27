import api from "@/app/lib/api";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RoleSelectorProps {
  label: string;
  apiUrl?: string; // optional if using static options
  name: string;
  optionKey?: string; // optional for staticOptions
  required: boolean;
  staticOptions?: string[]; // array of strings
}

type Role = { id: number; [key: string]: string | number };

export default function RoleSelector({
  label,
  apiUrl,
  name,
  optionKey,
  required,
  staticOptions = [],
}: RoleSelectorProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const { control } = useFormContext();

  useEffect(() => {
    if (!staticOptions.length && apiUrl) {
      api
        .get(apiUrl)
        .then((res) => {
          setRoles(res.data);
        })
        .catch((err) => console.error("Failed to fetch roles", err));
    }
  }, [apiUrl, staticOptions.length]);

  const dynamicId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1">
      <Label htmlFor={dynamicId}>{label}</Label>
      <Controller
        rules={required ? { required: `${label} is required` } : {}}
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <div>
            <Select
              value={field.value != null ? String(field.value) : ""}
              onValueChange={(val) =>
                staticOptions.length
                  ? field.onChange(val)
                  : field.onChange(parseInt(val))
              }
            >
              <SelectTrigger
                id={dynamicId}
                disabled={!staticOptions.length && !roles.length}
                className="w-[200px] truncate"
              >
                <SelectValue
                  placeholder={`Select a ${label.toLowerCase()}`}
                  className="truncate"
                />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg border rounded-md">
                {staticOptions.length
                  ? staticOptions.map((opt) => (
                      <SelectItem
                        key={opt}
                        value={opt}
                        className="bg-white hover:bg-gray-100"
                      >
                        {opt}
                      </SelectItem>
                    ))
                  : roles.map((role) => (
                      <SelectItem
                        key={role.id}
                        value={String(role.id)}
                        className="bg-white hover:bg-gray-100"
                      >
                        {role[optionKey ?? "name"]}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
