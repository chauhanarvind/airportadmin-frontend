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

interface RoleSelectorProps {
  label: string; // Job role or user role
  apiUrl: string;
  optionKey: string; //e.g. name or roleName (column names in spring(model))
  onChange?: (value: string) => void;
  value?: string | number;
}

type Role = { id: number; [key: string]: string | number };

export default function RoleSelector({
  label,
  apiUrl,
  optionKey,
  onChange,
  value,
}: RoleSelectorProps) {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    api
      .get(apiUrl)
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Failed to fetch roles", err));
  }, [apiUrl]);

  const dynamicId = label.toLowerCase().replace(/\s+/g, "-"); // e.g., "Job Role" → "job-role"

  return (
    <div className="space-y-1">
      <Label htmlFor="role">{label}</Label>
      <Select value={value?.toString()} onValueChange={onChange}>
        <SelectTrigger id={dynamicId} disabled={!roles.length}>
          <SelectValue
            placeholder={`Select a ${label.toLowerCase()}`}
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
    </div>
  );
}
