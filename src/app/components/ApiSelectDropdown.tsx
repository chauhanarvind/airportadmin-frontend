"use client";

import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import api from "@/app/lib/api";

interface ApiSelectDropdownProps {
  label: string;
  name: string;
  apiUrl: string;
  optionKey?: string; // default is "name"
  required?: boolean;
}

type ApiItem = { id: number; [key: string]: string | number };

export default function ApiSelectDropdown({
  label,
  name,
  apiUrl,
  optionKey = "name",
  required = true,
}: ApiSelectDropdownProps) {
  const { control } = useFormContext();
  const [options, setOptions] = useState<ApiItem[]>([]);

  useEffect(() => {
    api
      .get(apiUrl)
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => console.error(`Failed to fetch ${label}`, err));
  }, [apiUrl, label]);

  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} is required` } : {}}
        render={({ field, fieldState }) => (
          <>
            <Select
              value={field.value !== undefined ? String(field.value) : ""}
              onValueChange={(val) =>
                field.onChange(val ? parseInt(val) : undefined)
              }
            >
              <SelectTrigger id={id} className="w-[250px]">
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent className="bg-white border rounded-md shadow-lg">
                {options.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item[optionKey] ?? `Item ${item.id}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
