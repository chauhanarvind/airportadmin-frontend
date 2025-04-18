import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { useEffect, useState } from "react";

interface RoleSelectorProps {
  label: string; // Job role or user role
  apiUrl: string;
  optionKey: string; //e.g. name or roleName (column names)
}

type Role = { id: number; [key: string]: string | number };

export default function RoleSelector({
  label,
  apiUrl,
  optionKey,
}: RoleSelectorProps) {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Failed to fetch roles", err));
  }, []);

  const dynamicId = label.toLowerCase().replace(/\s+/g, "-"); // e.g., "Job Role" → "job-role"

  console.log(roles);

  return (
    <div className="space-y-1">
      <Label htmlFor="role">{label}</Label>
      <Select>
        <SelectTrigger id={dynamicId} disabled={!roles.length}>
          <SelectValue
            placeholder={`Select a ${label.toLowerCase()}`}
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role[optionKey] as string}>
              {role[optionKey]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
