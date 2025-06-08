"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { uiTheme } from "../lib/uiConfig";

interface StaticSelectDropdownProps {
  label: string;
  name: string;
  staticOptions: string[];
  required?: boolean;
  disabledOptions?: string[];
}

export default function StaticSelectDropdown({
  label,
  name,
  staticOptions,
  required = true,
  disabledOptions = [],
}: StaticSelectDropdownProps) {
  const { control } = useFormContext();
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
            <Select value={field.value || ""} onValueChange={field.onChange}>
              <SelectTrigger className={uiTheme.components.select.trigger}>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent className={uiTheme.components.select.content}>
                {staticOptions.map((opt) => (
                  <SelectItem
                    key={opt}
                    value={opt}
                    disabled={disabledOptions.includes(opt)}
                    className={
                      disabledOptions.includes(opt)
                        ? uiTheme.components.select.itemDisabled
                        : uiTheme.components.select.item
                    }
                  >
                    {opt}
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
