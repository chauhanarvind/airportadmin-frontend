"use client";

import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import api from "@/app/lib/api";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppSelectProps {
  label: string;
  name: string;
  apiUrl?: string; // for dynamic options
  optionKey?: string; // key to show from dynamic object
  staticOptions?: string[]; // static string array
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

type Option = { id: number; [key: string]: string | number };

export default function AppSelect({
  label,
  name,
  apiUrl,
  optionKey = "name",
  staticOptions = [],
  required = false,
  disabled = false,
  placeholder,
}: AppSelectProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const { control } = useFormContext();

  useEffect(() => {
    if (!staticOptions.length && apiUrl) {
      api
        .get(apiUrl)
        .then((res) => setOptions(res.data))
        .catch((err) => console.error(`Failed to fetch ${label}`, err));
    }
  }, [apiUrl, staticOptions.length, label]);

  const dynamicId = `${name}-${label}`.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-3">
      <Label htmlFor={dynamicId}>{label}</Label>

      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} is required` } : {}}
        render={({ field, fieldState }) => (
          <div>
            <Select
              value={field.value != null ? String(field.value) : ""}
              onValueChange={(val) =>
                staticOptions.length
                  ? field.onChange(val)
                  : field.onChange(parseInt(val))
              }
              disabled={disabled || (!staticOptions.length && !options.length)}
            >
              <SelectTrigger id={dynamicId} className="w-[200px] truncate">
                <SelectValue
                  placeholder={placeholder ?? `Select a ${label.toLowerCase()}`}
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
                  : options.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={String(item.id)}
                        className="bg-white hover:bg-gray-100"
                      >
                        {item[optionKey]}
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
