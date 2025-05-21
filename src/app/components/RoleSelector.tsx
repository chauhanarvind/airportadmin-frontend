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
  label: string; // Job role or user role
  apiUrl: string;
  name: string; //e.g. name or roleName (column names in spring(model))
  optionKey: string;
}

type Role = { id: number; [key: string]: string | number };

export default function RoleSelector({
  label,
  apiUrl,
  name,
  optionKey,
}: RoleSelectorProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const { control } = useFormContext();

  useEffect(() => {
    api
      .get(apiUrl)
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => console.error("Failed to fetch roles", err));
  }, [apiUrl, roles.length]);

  const dynamicId = label.toLowerCase().replace(/\s+/g, "-"); // e.g., "Job Role" → "job-role"

  return (
    <div className="space-y-1">
      <Label htmlFor="role">{label}</Label>
      <Controller
        rules={{ required: `${label} is required` }}
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <div>
            <Select
              value={field.value != null ? String(field.value) : ""}
              onValueChange={(val) => field.onChange(parseInt(val))}
            >
              <SelectTrigger
                id={dynamicId}
                disabled={!roles.length}
                className="truncate max-w-[180px]"
              >
                <SelectValue
                  placeholder={`Select a ${label.toLowerCase()}`}
                  className="truncate"
                ></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role[optionKey]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-sm text-red-500 ">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
