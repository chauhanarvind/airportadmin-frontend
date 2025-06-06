"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StaffingRequestCreate } from "../../common/staffing-requests/StaffingRequestTypes";
import { uiTheme } from "@/app/lib/uiConfig";
import RoleSelector from "@/app/components/ApiSelectDropdown";

interface Props {
  day: { id: string; date: string };
  dayIndex: number;
}

export default function DayRosterTable({ day, dayIndex }: Props) {
  const { control, register } = useFormContext<StaffingRequestCreate>();

  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `days.${dayIndex}.items`,
  });

  return (
    <div
      className={`${uiTheme.colors.card} ${uiTheme.spacing.cardPadding} space-y-4`}
    >
      <h3 className="font-semibold text-lg">
        {new Date(day.date).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </h3>

      {itemFields.map((item, itemIndex) => (
        <div key={item.id} className={`${uiTheme.layout.formGrid} items-end`}>
          <RoleSelector
            label="Job Role"
            name={`days.${dayIndex}.items.${itemIndex}.jobRoleId`}
            apiUrl="/api/job-roles/"
            optionKey="roleName"
            required
          />

          <RoleSelector
            label="Job Level"
            name={`days.${dayIndex}.items.${itemIndex}.jobLevelId`}
            apiUrl="/api/job-levels/"
            optionKey="levelName"
            required
          />

          <div className="space-y-1">
            <Label className={uiTheme.text.label}>Required Count</Label>
            <Input
              type="number"
              {...register(
                `days.${dayIndex}.items.${itemIndex}.requiredCount`,
                {
                  required: true,
                }
              )}
            />
          </div>

          <div className="space-y-1">
            <Label className={uiTheme.text.label}>Start Time</Label>
            <Input
              type="time"
              {...register(`days.${dayIndex}.items.${itemIndex}.startTime`, {
                required: true,
              })}
            />
          </div>

          <div className="space-y-1">
            <Label className={uiTheme.text.label}>End Time</Label>
            <Input
              type="time"
              {...register(`days.${dayIndex}.items.${itemIndex}.endTime`, {
                required: true,
              })}
            />
          </div>

          <div>
            <Button
              type="button"
              className={uiTheme.buttons.destructive}
              onClick={() => remove(itemIndex)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        className={uiTheme.colors.primary}
        onClick={() =>
          append({
            jobRoleId: 0,
            jobLevelId: 0,
            requiredCount: 1,
            startTime: "09:00",
            endTime: "17:00",
          })
        }
      >
        + Add Role
      </Button>
    </div>
  );
}
