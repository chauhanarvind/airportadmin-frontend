"use client";

import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import api from "@/app/lib/api"; // adjust path if needed
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface RoleSelectorProps {
  label: string; // e.g. "Job Role", "Location"
  apiUrl: string; // e.g. "/api/job-roles/"
  name: string; // e.g. "items.0.jobRoleId"
  optionKey: string; // e.g. "roleName", "locationName"
}

type Role = {
  id: number;
  [key: string]: string | number;
};

export default function RoleSelector({
  label,
  apiUrl,
  name,
  optionKey,
}: RoleSelectorProps) {
  const { control } = useFormContext();
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    api
      .get(apiUrl)
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => console.error(`Failed to fetch ${label}`, err));
  }, [apiUrl]);

  const dynamicId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1">
      {label && <Label htmlFor={dynamicId}>{label}</Label>}

      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field, fieldState }) => (
          <div>
            <Select
              value={field.value != null ? String(field.value) : ""}
              onValueChange={(val) => field.onChange(parseInt(val))}
              disabled={!roles.length}
            >
              <SelectTrigger id={dynamicId} className="truncate max-w-[200px]">
                <SelectValue
                  placeholder={`Select a ${label.toLowerCase()}`}
                  className="truncate"
                />
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
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
